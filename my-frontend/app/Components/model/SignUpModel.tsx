'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "../forms/CustomButton";
import useSignUpModal from "@/app/hooks/useSignUpModal";
import Model from "./Model";
import apiService from "@/app/services/apiServices";
import { handleLogin } from "@/app/lib/action";

const SignupModal = () => {
    //
    // Variables

    const router = useRouter();
    const signupModal = useSignUpModal();
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    //
    // Submit functionality

    const submitSignup = async () => {
        const formData = {
            email: email,
            password1: password1,
            password2: password2
        }

        // Pass the formData object directly without JSON.stringify
        const response = await apiService.postWithoutToken('api/auth/register/', formData);
        console.log("signup response",response);
        console.log("signup formdata",formData);
        
        

        if (response.access) {
            handleLogin(response.user.pk, response.access, response.refresh);

            signupModal.close();

            router.push('/')
        } else {
            const tmpErrors: string[] = [];
            
            // Improved error handling to handle various response formats
            if (response.non_field_errors) {
                // Handle non-field errors array
                tmpErrors.push(...response.non_field_errors);
            } else if (typeof response === 'object') {
                // Handle field-specific errors
                Object.entries(response).forEach(([field, error]) => {
                    if (Array.isArray(error)) {
                        tmpErrors.push(...error.map(e => `${field}: ${e}`));
                    } else if (typeof error === 'string') {
                        tmpErrors.push(`${field}: ${error}`);
                    }
                });
            }

            setErrors(tmpErrors.length > 0 ? tmpErrors : ['An unknown error occurred']);
        }
    }

    const content = (
        <>
            <form 
                action={submitSignup}
                className="space-y-4"
            >
                <input onChange={(e) => setEmail(e.target.value)} placeholder="Your e-mail address" type="email" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />

                <input onChange={(e) => setPassword1(e.target.value)} placeholder="Your password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />

                <input onChange={(e) => setPassword2(e.target.value)} placeholder="Repeat password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
            
                {errors.map((error, index) => {
                    return (
                        <div 
                            key={`error_${index}`}
                            className="p-5 bg-airbnb text-white rounded-xl opacity-80"
                        >
                            {error}
                        </div>
                    )
                })}

                <CustomButton
                    label="Submit"
                    onClick={submitSignup}
                />
            </form>
        </>
    )

    return (
        <Model
            isOpen={signupModal.isOpen}
            close={signupModal.close}
            label="Sign up"
            content={content}
        />
    )
}

export default SignupModal;