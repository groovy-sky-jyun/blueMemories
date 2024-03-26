import React, { useState } from 'react';
import axios from 'axios';
import {Helmet} from "react-helmet";
import {Body,LeftContainer,RightContainer,MessageContainer,WelcomeMassage,
    LoginContainer,LoginText,InputText,InputBox,ButtonBox,LoginButton,JoinButton} from "../../components/LoginJoin"
import {useNavigate} from "react-router-dom";

const RegisterForm = () => {
    const [memberId, setMemberId] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const navigate = useNavigate();
    const goLogin = () => {
        navigate('/login');
    }

    const handleRegister = () => {
        axios.post('http://localhost:8080/api/register', {
            memberId: memberId,
            password: password,
            nickname: nickname,
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error during registration:', error);
            });
    };

    return (
        <div>
            <Helmet>
                <title>Register</title>
                <meta name="description" content="BlueMemories Main App"/>
            </Helmet>
            <Body>
                <LeftContainer></LeftContainer>
                <RightContainer>
                    <MessageContainer topmargin={'10%'}>
                        <LoginText>Register</LoginText>
                        <WelcomeMassage>Register your account</WelcomeMassage>
                    </MessageContainer>
                    <LoginContainer topmargin={'10%'}>
                        <InputText>Nickname</InputText>
                        <InputBox type="text" placeholder="Enter your name" onChange={(e) => setNickname(e.target.value)}></InputBox>
                        <InputText>Id</InputText>
                        <InputBox type="text" placeholder="Enter your id"  onChange={(e) => setMemberId(e.target.value)}></InputBox>
                        <InputText>Password</InputText>
                        <InputBox type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}></InputBox>
                        <InputText>Password check</InputText>
                        <InputBox type="password" placeholder="Confirm password"></InputBox>
                    </LoginContainer>
                    <ButtonBox flex={'column'} bbtMargin={"2%"}>
                        <JoinButton onClick={goLogin}>Login</JoinButton>
                        <LoginButton lbmargin={'23%'} onClick={handleRegister}>Sign Up</LoginButton>
                    </ButtonBox>

                </RightContainer>
            </Body>

    </div>
)
    ;
};

export default RegisterForm;
