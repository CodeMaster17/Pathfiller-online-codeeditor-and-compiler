import { EUserRole } from '../constant/userConstant';
export interface IRegisterUserRequestBody {
    name: string;
    emailAddress: string;
    password: string;
    phoneNumber: string;
    consent: boolean;
}

export interface IUser {
    name: string;
    emailAddress: string;
    phoneNumber: {
        isoCode: string;
        countryCode: string;
        internationalNumber: string;
    };
    timezone: string;
    password: string;
    role: EUserRole;
    accountConfirmation: {
        status: boolean;
        token: string;
        code: string;
        timestamp: Date | null;
    };
    passwordReset: {
        token: string | null;
        expiry: number | null;
        lastResetAt: Date | null;
    };
    lastLoginAt: Date | null;
    consent: boolean;
}
