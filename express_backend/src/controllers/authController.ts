import { NextFunction, Request, Response } from 'express';
import responseMessage from '../constants/responseMessage';
import { EUserRole } from '../constants/userConstants';
import authService from '../service/authService';
import { validateJoiSchema, ValidateRegisterBody } from '../service/validationService';
import { IRegisterUserRequestBody, IUser } from '../types/userTypes';
import httpError from '../utils/httpError';
import httpResponse from '../utils/httpResponse';
import quicker from '../utils/quicker';

interface IRegisterRequest extends Request {
    body: IRegisterUserRequestBody;
}

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req as IRegisterRequest;

        // * Body validation
        const { error, value } = validateJoiSchema<IRegisterUserRequestBody>(ValidateRegisterBody, body);
        if (error) {
            return httpError(next, error, req, 422);
        }

        // * Destructuring Value
        const { name, emailAddress, password, phoneNumber, consent } = value;

        const { countryCode, isoCode, internationalNumber } = quicker.parsePhoneNumber(`+` + phoneNumber);

        if (!countryCode || !isoCode || !internationalNumber) {
            return httpError(next, new Error(responseMessage.INVALID_PHONE_NUMBER), req, 422);
        }

        // * Timezone
        const timezone = quicker.countryTimezone(isoCode);

        if (!timezone || timezone.length === 0) {
            return httpError(next, new Error(responseMessage.INVALID_PHONE_NUMBER), req, 422);
        }

        // * Check User Existence using Email Address
        const user = await authService.findUserByEmailAddress(emailAddress);
        if (user) {
            return httpError(next, new Error(responseMessage.ALREADY_EXIST('user', emailAddress)), req, 403);
        }

        // * Encrypting Password
        const encryptedPassword = await quicker.hashPassword(password);

        // * Account Confirmation Object
        const token = quicker.generateRandomId();
        const code = quicker.generateOtp(6);

        // * Preparing Object
        const payload: IUser = {
            name,
            emailAddress,
            phoneNumber: {
                countryCode: countryCode,
                isoCode: isoCode,
                internationalNumber: internationalNumber
            },
            accountConfirmation: {
                status: false,
                token,
                code: code,
                timestamp: null
            },
            passwordReset: {
                token: null,
                expiry: null,
                lastResetAt: null
            },
            lastLoginAt: null,
            role: EUserRole.USER,
            timezone: timezone[0].name,
            password: encryptedPassword,
            consent
        };

        // Create New User
        const newUser = await authService.registerUser(payload);

        // send email

        httpResponse(req, res, 201, responseMessage.SUCCESS, newUser);
    } catch (err) {
        httpError(next, err, req, 500);
    }
};

