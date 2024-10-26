import { createContext, useState } from 'react';

export const NotificationModalContext = createContext<null | {
    setModalIsActive: ()=>void,
    isModalActive: boolean
}>(null);


