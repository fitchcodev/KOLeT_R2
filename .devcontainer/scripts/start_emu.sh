#!/bin/bash

# Colors for output
BL='\033[0;34m'
G='\033[0;32m'
RED='\033[0;31m'
YE='\033[1;33m'
NC='\033[0m' # No Color

# Setup KVM permissions
function setup_kvm() {
    if [[ ! -e /dev/kvm ]]; then
        printf "${RED}KVM device not found. Setting up KVM...${NC}\n"
        sudo modprobe kvm
        sudo modprobe kvm_intel
    fi

    if ! groups | grep -q kvm; then
        printf "${YE}Adding user to KVM group...${NC}\n"
        sudo groupadd -r kvm || true
        sudo usermod -a -G kvm $USER
        printf "${G}Please log out and back in for KVM changes to take effect${NC}\n"
        exit 1
    fi
}

# Wait for emulator to be fully booted
function wait_for_emulator() {
    local timeout=60
    local counter=0
    printf "${BL}Waiting for emulator to boot...${NC}\n"

    while [[ $counter -lt $timeout ]]; do
        if adb wait-for-device shell getprop sys.boot_completed 2>/dev/null | grep -q '1'; then
            printf "${G}Emulator is ready!${NC}\n"
            return 0
        fi
        sleep 1
        ((counter++))
    done

    printf "${RED}Timeout waiting for emulator${NC}\n"
    return 1
}

function start_emulator() {
    emulator_name=${EMULATOR_NAME}

    # Check if emulator exists
    if ! avdmanager list avd | grep -q "$emulator_name"; then
        printf "${RED}Emulator $emulator_name not found!${NC}\n"
        exit 1
    }

    # Start emulator with hardware acceleration
    emulator -avd "${emulator_name}" \
        -no-boot-anim \
        -no-audio \
        -gpu swiftshader_indirect \
        -accel on &

    printf "${G}==>  ${BL}Starting emulator ${YE}${EMULATOR_NAME}${BL}...${NC}\n"
}

function disable_animation() {
    if wait_for_emulator; then
        adb shell "settings put global window_animation_scale 0.0"
        adb shell "settings put global transition_animation_scale 0.0"
        adb shell "settings put global animator_duration_scale 0.0"
        printf "${G}Animations disabled${NC}\n"
    else
        printf "${RED}Failed to disable animations${NC}\n"
        exit 1
    fi
}

# Main execution
setup_kvm
start_emulator
disable_animation
