import {Helmet} from "react-helmet";
import styled from 'styled-components';
import React, { useState } from 'react';
import { WriteMenuBar } from '../../components/WriteMenuBar';

const Wrapper = styled.div`
    width:100%;
    height:100vh;
    display: flex;
    background-color: #FBF5E4;
    flex-direction:column;
    align-items: center; /* 수직 중앙 정렬 */
`;

const BodyContainer=styled.div`
    width: 80%;
    height:100%;
    margin-bottom:1%;
    /*item정렬*/
    display: flex;
    justify-content: space-between;/* 수평  정렬 */
    flex-direction: row;
    align-items: center; /* 수직 중앙 정렬 */
`;
const BeforePageBtn = styled.button`
    background: url("/resourcesPng/writeNovelPage/beforePageBtn.png") no-repeat;
    background-size: contain;
    /*스타일*/
    border: none;
    /*크기*/
    height: 2.5vw;
    width: 2.5vw;
    /*마우스 HOVER 설정*/
    cursor: pointer;
    &:active {
        background: url("/resourcesPng/writeNovelPage/beforePageBtnActive.png") no-repeat;
        background-size: contain;
        /*크기*/
        height: 2.5vw;
        width: 2.5vw;
    }
`;
const AfterePageBtn = styled.button`
    background: url("/resourcesPng/writeNovelPage/afterPageBtn.png") no-repeat;
    background-size: contain;
    /*스타일*/
    border: none;
    /*크기*/
    height: 2.5vw;
    width: 2.5vw;
    /*마우스 HOVER 설정*/
    cursor: pointer;
    &:active {
        background: url("/resourcesPng/writeNovelPage/afterPageBtnActive.png") no-repeat;
        background-size: contain;
        /*크기*/
        height: 2.5vw;
        width: 2.5vw;
    }
`;

const WriteContainer = styled.div`
    width: 70%;
    height: 40vw;
    /*item 정렬*/
    display: flex;
    position:relative;
    justify-content: center;/* 수평  정렬 */
    align-items: center; /* 수직 중앙 정렬 */
`;
const WritePage = styled.div`
    background: url("/resourcesPng/writeNovelPage/whitePage.png") no-repeat center;
    background-size: contain;
    /*스타일*/
    border: none;
    /*크기*/
    width: 55vw;
    height: 40vw;
    /*레이어*/
    position:absolute;
    z-index: 1;
`;
const ButtonStyled=styled.button`
    background: url("/resourcesPng/writeNovelPage/addImageBtn.png") no-repeat;
    background-size: contain;
    /*스타일*/
    border: none;
    /*크기*/
    height: 10%;
    width: 10%;
    /*레이어*/
    position:absolute;
    z-index: 3;
    /*위치*/
    top: 8%;
    left: ${(props) => props.marginLeft ||'4.5%'};
    /*마우스 HOVER 설정*/
    cursor: pointer;
`;
const ImageCreateBtn = ({ isHidden, marginLeft }) => (
    <ButtonStyled style={{
        display: isHidden ? 'none' : 'block', marginLeft
    }} />
);
const TextareaStyled = styled.textarea`
    width: 22.5vw;
    height: 32vw;
    /*스타일*/
    border: none;
    outline:none;
    resize: none;
    /*텍스트 설정*/
    font-size: 0.8vw;
    font-family: BokkLight, sans-serif; //대체폰트
    /*레이어*/
    position:absolute;
    z-index: 2;
    /*위치*/
    top:12%;
    left: ${(props) => props.marginLeft || '4.5%'};
    &:focus {
        border: none; // 클릭했을 때 테두리 없앰
        outline:none;
        resize: none;
        /*텍스트 설정*/
        font-size: 0.8vw;
        font-family: BokkLight, sans-serif; //대체폰트
    }
`;
const WriteTextarea = ({ content, setContent, setIsFocused,marginLeft }) => (
    <TextareaStyled
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        marginLeft={marginLeft}
    />
);

const WriteNovelForm = () => {
    // 초기값 빈 문자열
    const [a_content, a_setContent] = useState('');
    const [b_content, b_setContent] = useState('');
    // Textarea의 포커스 상태 초기화
    const [a_isTextareaFocused, a_setIsTextareaFocused] = useState(false);
    const [b_isTextareaFocused, b_setIsTextareaFocused] = useState(false);
    // 사용자 입력에 따라 content 상태 업데이트
    // const handleChange = (e) => {
    //     setContent(e.target.value);
    // };
    //textarea에 포커스가 있을때 && 내용이 적혀있을때 => 그림생성 버튼 hidden
    const a_isButtonHidden = a_isTextareaFocused || a_content.length > 0;
    const b_isButtonHidden = b_isTextareaFocused || b_content.length > 0;

    return (
        <div>
            <Helmet>
                <title>WriteNovel</title>
                <meta name="description" content="BlueMemories WriteNovel Page"/>
            </Helmet>
            <Wrapper>
                <WriteMenuBar></WriteMenuBar>
                <BodyContainer>
                    <BeforePageBtn></BeforePageBtn>
                    <WriteContainer>
                        <WritePage></WritePage>
                        <WriteTextarea
                            content={a_content}
                            setContent={a_setContent}
                            setIsFocused={a_setIsTextareaFocused}
                        />
                        <WriteTextarea marginLeft="53.5%"
                            content={b_content}
                            setContent={b_setContent}
                            setIsFocused={b_setIsTextareaFocused}
                        />
                        <ImageCreateBtn isHidden={a_isButtonHidden}></ImageCreateBtn>
                        <ImageCreateBtn isHidden={b_isButtonHidden} marginLeft="49%"></ImageCreateBtn>

                    </WriteContainer>
                    <AfterePageBtn></AfterePageBtn>
                </BodyContainer>
            </Wrapper>
        </div>
    );
};

export default WriteNovelForm;
