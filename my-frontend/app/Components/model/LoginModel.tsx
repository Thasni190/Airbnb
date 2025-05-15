'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";
import apiService from "@/app/services/apiServices";
import { handleLogin } from "@/app/lib/action";
import Model from "./Model";

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const submitLogin = async () => {
        const formData = {
            email: email,
            password: password
        };

        try {
            const response = await apiService.postWithoutToken('/api/auth/login/', formData);
            console.log("response",response);
            console.log("fromdata",formData);
            
            

            if (response.access) {
                handleLogin(response.user.pk, response.access, response.refresh);
                loginModal.close();
                router.push('/');
            } else {
                // Always set errors as an array
                setErrors(response.non_field_errors ?? ['Login failed. Please try again.']);
            }
        } catch (error) {
            // Handle unexpected errors like network problems
            setErrors(['An unexpected error occurred. Please try again.']);
            console.error(error);
        }
    };

    const content = (
        <>
            <form 
                onSubmit={(e) => {
                    e.preventDefault(); 
                    submitLogin();
                }}
                className="space-y-4"
            >
                <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email}
                    placeholder="Your e-mail address" 
                    type="email" 
                    className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" 
                />

                <input 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password}
                    placeholder="Your password" 
                    type="password" 
                    className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" 
                />

                {errors.length > 0 && errors.map((error, index) => (
                    <div 
                        key={`error_${index}`}
                        className="p-5 bg-airbnb text-white rounded-xl opacity-80"
                    >
                        {error}
                    </div>
                ))}

                <CustomButton
                    label="Submit"
                    onClick={submitLogin}
                />
            </form>
        </>
    );

    return (
        <Model
            isOpen={loginModal.isOpen}
            close={loginModal.close}
            label="Log in"
            content={content}
        />
    );
};

export default LoginModal;
