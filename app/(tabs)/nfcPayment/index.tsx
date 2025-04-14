import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ArrowLftIC from '@/assets/images/svg/ArrowLftIC';
import ShareIC from '@/assets/images/svg/ShareIC';
import { router } from 'expo-router';
import { hp } from '@/helpers/common';
import LottieView from 'lottie-react-native';
import NfcManager, { NfcTech, NfcEvents } from 'react-native-nfc-manager';
import { useTransaction } from '@/contexts/TransactionContext';
import { useFocusEffect } from '@react-navigation/native';
import * as Device from 'expo-device';

const NfcPaymentScreen: FC = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const animation = useRef<LottieView>(null);
  const { transaction } = useTransaction();

  const [isReading, setIsReading] = useState(false);
  const [nfcReady, setNfcReady] = useState(false);
  const [hasProcessedTag, setHasProcessedTag] = useState(false);
  const [isSamsungDevice, setIsSamsungDevice] = useState(false);

  const latestTransactionRef = useRef(transaction);

  useEffect(() => {
    latestTransactionRef.current = transaction;
  }, [transaction]);

  // Check if device is Samsung
  useEffect(() => {
    const checkDeviceManufacturer = async () => {
      try {
        const manufacturer = await Device.manufacturer;
        const isSamsung =
          manufacturer?.toLowerCase().includes('samsung') || false;
        setIsSamsungDevice(isSamsung);
        console.log(
          'Device manufacturer:',
          manufacturer,
          'Is Samsung:',
          isSamsung
        );
      } catch (error) {
        console.log('Error checking device manufacturer:', error);
        setIsSamsungDevice(false);
      }
    };

    checkDeviceManufacturer();
  }, []);

  // Initialize NFC once on mount with Samsung-specific handling
  useEffect(() => {
    const setupNfc = async () => {
      try {
        // Check if NFC is supported and enabled
        const isSupported = await NfcManager.isSupported();

        if (!isSupported) {
          Alert.alert(
            'NFC Not Supported',
            "This device doesn't support NFC payments."
          );
          router.back();
          return;
        }

        const isEnabled = await NfcManager.isEnabled();
        if (!isEnabled) {
          Alert.alert(
            'NFC Disabled',
            'Please enable NFC in your device settings.',
            [
              {
                text: 'Cancel',
                onPress: () => router.back(),
                style: 'cancel',
              },
              {
                text: 'Open Settings',
                onPress: () => {
                  // Open NFC settings on Android
                  try {
                    NfcManager.goToNfcSetting();
                  } catch (ex) {
                    console.log('Cannot open NFC settings', ex);
                  }
                },
              },
            ]
          );
          return;
        }

        await NfcManager.start();

        // Different event registration for Samsung vs other devices
        if (isSamsungDevice) {
          console.log('Using Samsung-specific NFC handling');
          // For Samsung, we'll only initialize NFC but not set up event handlers
          // This is intentional - Samsung devices work better with direct technology requests
          // Event listeners will be set up in the scanNfc function

          // Optionally: We'll Pre-cancel any existing requests to ensure clean state
          await NfcManager.cancelTechnologyRequest().catch(() => {});
        } else {
          await NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
            if (!hasProcessedTag) {
              setHasProcessedTag(true);

              const currentTransaction = latestTransactionRef.current;

              // Process successful payment
              Alert.alert(
                'Payment successful!',
                `Payment of ${currentTransaction.formattedAmount} was successful!`,
                [
                  {
                    text: 'View Receipt',
                    onPress: () => {
                      router.navigate('/(tabs)/receipt');
                    },
                  },
                ]
              );

              NfcManager.unregisterTagEvent().catch(() => {});
            }
          });
        }

        setNfcReady(true);
      } catch (ex) {
        console.error('Error setting up NFC:', ex);
        Alert.alert('NFC Error', 'Could not initialize NFC. Please try again.');
      }
    };

    setupNfc();

    // Cleanup on unmount
    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.unregisterTagEvent().catch(() => {});
    };
  }, [isSamsungDevice]);

  // Start and stop scanning when screen is focused/unfocused
  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      const scanNfc = async () => {
        try {
          if (!nfcReady) return;

          const currentTransaction = latestTransactionRef.current;

          setIsReading(true);
          setHasProcessedTag(false);

          // Samsung-specific NFC handling
          if (isSamsungDevice) {
            try {
              // Clean up any existing operations
              await NfcManager.cancelTechnologyRequest().catch(() => {});

              // Use technology request for Samsung (more reliable on Samsung)
              await NfcManager.requestTechnology(NfcTech.Ndef);

              // Introduce a slight delay for Samsung devices
              await new Promise(resolve => setTimeout(resolve, 500));

              const tag = await NfcManager.getTag();
              console.log('Samsung NFC tag read successful');

              // Mark as processed
              setHasProcessedTag(true);

              // Process successful payment
              Alert.alert(
                'Payment successful!',
                `Payment of ${currentTransaction.formattedAmount} was successful!`,
                [
                  {
                    text: 'View Receipt',
                    onPress: () => {
                      router.navigate('/(tabs)/receipt');
                    },
                  },
                ]
              );

              // Cancel the technology request to prevent Samsung login prompts
              NfcManager.cancelTechnologyRequest().catch(() => {});
            } catch (ex) {
              console.log('Samsung NFC error:', ex);
              if (
                isMounted &&
                !ex.toString().includes('cancelled') &&
                !ex.toString().includes('user_cancel')
              ) {
                Alert.alert(
                  'NFC Error',
                  'Failed to read NFC card. Please try again.'
                );
              }
            } finally {
              if (isMounted) {
                setIsReading(false);
              }
            }
          } else {
            // Non-Samsung device handling (event-based)
            // Make sure no other NFC operations are running
            await NfcManager.unregisterTagEvent().catch(() => {});
            await NfcManager.cancelTechnologyRequest().catch(() => {});

            // Start listening for NFC tags
            await NfcManager.registerTagEvent();
          }
        } catch (ex) {
          console.log('Error scanning NFC:', ex);
          if (isMounted) {
            setIsReading(false);
            // Only show error for real failures
            if (!ex.toString().includes('cancelled')) {
              Alert.alert(
                'NFC Error',
                'Failed to start NFC scanning. Please try again.'
              );
            }
          }
        }
      };

      // Delay slightly to ensure component is fully mounted
      const timer = setTimeout(() => {
        scanNfc();
      }, 300);

      return () => {
        isMounted = false;
        clearTimeout(timer);
        NfcManager.unregisterTagEvent().catch(() => {});
        NfcManager.cancelTechnologyRequest().catch(() => {});
        setIsReading(false);
      };
    }, [nfcReady, isSamsungDevice])
  );

  // Function to manually restart NFC scanning
  const handleRetryNfc = async () => {
    try {
      setIsReading(true);
      setHasProcessedTag(false);

      if (isSamsungDevice) {
        // Samsung-specific retry logic
        try {
          await NfcManager.cancelTechnologyRequest().catch(() => {});
          await NfcManager.requestTechnology(NfcTech.Ndef);
        } catch (ex) {
          console.log('Samsung retry error:', ex);
          setIsReading(false);
        }
      } else {
        // Standard retry logic
        // Cancel any existing operations
        await NfcManager.unregisterTagEvent().catch(() => {});
        await NfcManager.cancelTechnologyRequest().catch(() => {});

        // Start listening again
        await NfcManager.registerTagEvent();
      }
    } catch (ex) {
      console.log('Error restarting NFC:', ex);
      setIsReading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop }]}>
      {/* Buttons */}
      <View style={styles.topBtn}>
        <Pressable onPress={() => router.back()}>
          <ArrowLftIC width={25} height={25} />
        </Pressable>

        <Pressable onPress={() => router.back()}>
          <ShareIC width={25} height={25} />
        </Pressable>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Total</Text>
        <Text style={styles.amount}>{transaction.formattedAmount}</Text>
        <Text style={styles.description}>{transaction?.narration || ''}</Text>
      </View>

      {/* animation */}
      <Pressable
        style={styles.animationContainer}
        onPress={!isReading || hasProcessedTag ? handleRetryNfc : undefined}>
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: '100%',
            height: '100%',
          }}
          source={require('@/assets/nfcTap.json')}
        />
      </Pressable>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {isReading && !hasProcessedTag
            ? 'Reading...'
            : hasProcessedTag
            ? 'Payment Successful'
            : 'Tap Card'}
        </Text>
        {(!isReading || hasProcessedTag) && (
          <Pressable onPress={handleRetryNfc} style={styles.retryButton}>
            <Text style={styles.retryText}>
              {hasProcessedTag ? 'Scan another card' : 'Tap to retry'}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default NfcPaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.background,
    paddingHorizontal: 30,
    gap: hp(4),
  },
  topBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    gap: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    color: Colors.main.description,
  },
  amount: {
    fontSize: 48,
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.main.text,
    textAlign: 'left',
  },
  description: {
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    color: Colors.main.description,
  },
  animationContainer: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    alignItems: 'center',
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
    color: Colors.main.text,
  },
  modalTextTitle: {
    marginBottom: 15,
    fontFamily: 'Monserrat-Regular',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 20,
    color: Colors.main.text,
  },
  modalTextDes: {
    marginBottom: 15,
    fontFamily: 'Raleway-Regular',
    textAlign: 'center',
    lineHeight: 30,
    fontSize: 15,
    color: Colors.main.text,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.main.background,
    borderRadius: 20,
    padding: 40,
    gap: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 50,
    paddingVertical: 10,
    elevation: 2,
    backgroundColor: Colors.main.primary,
  },
  textStyle: {
    color: 'white',
    fontFamily: 'Raleway-Regular',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  retryText: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.main.primary,
  },
});
