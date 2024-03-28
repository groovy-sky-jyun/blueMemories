import {Helmet} from "react-helmet";
import styled, {css} from 'styled-components';
import React, { useState } from 'react';
import { WriteMenuBar } from '../../components/WriteMenuBar';
import DragAndDrop from './components/ImageDragAndDrop';
import ImageStyleDropDown from './components/imageStyle';
import ImagePrompt from "./components/imagePrompt";
import ImageUploader from "./components/imageFileInput";

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
    height: 9%;
    width: 6%;
    /*레이어*/
    position:absolute;
    z-index: 3;
    /*위치*/
    top: 8%;
    left: ${(props) => props.marginLeft ||'4.5%'};
    /*마우스 HOVER 설정*/
    cursor: pointer;
`;
const ImageCreateBtn = ({ isHidden, marginLeft, onClick }) => (
    <ButtonStyled style={{
        display: isHidden ? 'none' : 'block', marginLeft
    }} onClick={onClick}/>

);
const TextareaStyled = styled.textarea`
    width: 22.5vw;
    height: 31vw;
    /*스타일*/
    border: none;
    outline:none;
    resize: none;
    overflow: hidden; /* 스크롤바 숨김 */
    /*텍스트 설정*/
    font-size: 0.8vw;
    font-family: BokkLight, sans-serif; //대체폰트
    /*레이어*/
    position:absolute;
    z-index: 2;
    /*위치*/
    top:12%;
    left: ${(props) => props.marginLeft || '5.3%'};
    &:focus {
        border: none; // 클릭했을 때 테두리 없앰
        outline:none;
        resize: none;
        overflow: hidden; /* 스크롤바 숨김 */
        /*텍스트 설정*/
        font-size: 0.8vw;
        font-family: BokkLight, sans-serif; //대체폰트
    }
`;
// 사용자 입력에 따라 content 상태 업데이트
const WriteTextarea = ({ content, setContent, setIsFocused,marginLeft,maxLength }) => {
    //(textarea.scrollHeight > text.area.clientHeight)이면 setContent를 호출하지 않음
    //=> 추가 입력 x
    const handleChange = (e)=>{
        const textarea = e.target;
        if(textarea.scrollHeight <=textarea.clientHeight){
            setContent(textarea.value);
        }
    };

    return(
        <TextareaStyled
            value={content}
            // onChange={(e) => setContent(e.target.value)}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            marginLeft={marginLeft}
        />
    );
}
const LeftPageNumber=styled.span`
    left:6%;
    bottom:5%;
    //padding:2%;
    /*텍스트 설정*/
    font-size: 0.8vw;
    font-family: BokkLight, sans-serif; //대체폰트
    /*레이어*/
    position:absolute;
    z-index: 4;
    align-content: center;
    
`;
const RightPageNumber=styled.span`
    right:6%;
    bottom:5%;
    //padding:2%;
    /*텍스트 설정*/
    font-size: 0.8vw;
    font-family: BokkLight, sans-serif; //대체폰트
    /*레이어*/
    position:absolute;
    z-index: 4;
    align-content: center;
    
`;
///////////*이미지 생성*////////////
const Overlay = styled.div`
    //position: fixed;
    background: url("/resourcesPng/writeNovelPage/makingImageBackground.png") no-repeat;
    background-size: contain;
    top: 2%;
    left: 0;
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: absolute;
    z-index: 5;
    /*애니메이션*/
    // 애니메이션 효과 (시작부터끝까지 걸리는 시간/속도곡선)
    transition: transform 0.7s ease-out; 
    // 초기 상태 =>화면 상단 90% 숨김(화면밖 위로 수직이동)
    //transform: translateY(-40vw); 
    // visible 상태일 때 화면에 전체 보이도록 설정
    transform: ${props => props.visible ? 'translateY(2.8vw)':'translateY(-80vw)'};
`;
///*이미지 생성
const MakingImageLeftContainer=styled.div`
    display: flex;
    flex-direction: column;
    width:32vw;
    height: 45vw;
    align-items: center;
`;
const ImagePromptContainer = styled.div`
    width:30vw;
    height: 36.5vw;
    margin-top:2vw;
    padding-left: 0.5vw;
    padding-right: 0.3vw;
    /*도형 모양*/
    border:2px solid #83B19D;
    border-radius: 8px;
    background-color: transparent;
    /*item정렬*/
    display: flex;
    justify-content: center;
    flex-direction: column;
`;
const ImageCreateButton=styled.button`
    width:30.5vw;
    height: 3.2vw;
    margin-top:0.5vw;
    padding-bottom: 0.5vw;
    /*텍스트 스타일*/
    font-size: 2vw;
    font-family: gangwonedusaeeum, sans-serif; //대체폰트
    color: #D6E7DD;
    user-select: none;
    /*버튼 스타일*/
    background-color: #305940;
    border-radius: 5px;
    border: none;
    box-shadow: 0 2px 3px 2px rgba(16, 56, 38, 0.65);
    cursor: pointer;
    &:active{
        background-color: #204830;
    }
`;
const ImageShowContainer = styled.div`
    background: url("/resourcesPng/writeNovelPage/imageShowPanel.png") no-repeat;
    background-size: contain;
    width:26vw;
    height: 40vw;
    margin-left:3vw;
    margin-top:2vw;
    padding:5px;
`;

const Image = styled.img`
    width: 26vw;
    height: 38.7vw;
    object-fit: contain;
`;

const WriteNovelForm = () => {
    // 초기값 빈 문자열
    const [a_content, a_setContent] = useState('');
    const [b_content, b_setContent] = useState('');
    // Textarea의 포커스 상태 초기화
    const [a_isTextareaFocused, a_setIsTextareaFocused] = useState(false);
    const [b_isTextareaFocused, b_setIsTextareaFocused] = useState(false);
    //textarea에 포커스가 있을때 && 내용이 적혀있을때 => 그림생성 버튼 hidden
    const a_isButtonHidden = a_isTextareaFocused || a_content.length > 0;
    const b_isButtonHidden = b_isTextareaFocused || b_content.length > 0;

    //이미지 생성 background animation
    const [visible, setVisible] = useState(false);
    const toggleOverlay=()=>{
        setVisible(!visible);
    }
    // const handleClick = (event) => {
    //     event.stopPropagation();
    //     toggleOverlay();
    // };

    // 이미지 URL 상태 추가
    const [selectedImageUrl, setSelectedImageUrl] = useState('/resourcesPng/writeNovelPage/imageShowPanel.png');
    // 이미지가 선택되었을 때 호출될 함수
    const handleImageSelected = (imageUrl) => {
        setSelectedImageUrl(imageUrl);
    };

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
                        <WriteTextarea
                            marginLeft="53.8%"
                            maxLength="31vw"
                            content={b_content}
                            setContent={b_setContent}
                            setIsFocused={b_setIsTextareaFocused}
                        />
                        <ImageCreateBtn onClick={toggleOverlay} isHidden={a_isButtonHidden} ></ImageCreateBtn>
                        <ImageCreateBtn onClick={toggleOverlay} isHidden={b_isButtonHidden} marginLeft="49%"></ImageCreateBtn>

                        <LeftPageNumber>2</LeftPageNumber>
                        <RightPageNumber>3</RightPageNumber>
                    </WriteContainer>
                    <AfterePageBtn></AfterePageBtn>
                </BodyContainer>


                <Overlay visible={visible}>
                    <MakingImageLeftContainer>
                        <ImagePromptContainer>
                            <ImageStyleDropDown></ImageStyleDropDown>
                            <ImagePrompt></ImagePrompt>
                            <ImageUploader onImageSelected={handleImageSelected}></ImageUploader>
                            <DragAndDrop onImageSelected={handleImageSelected}></DragAndDrop>
                        </ImagePromptContainer>
                        <ImageCreateButton>AI 그림 생성하기</ImageCreateButton>
                    </MakingImageLeftContainer>
                    <ImageShowContainer>
                        <Image src={selectedImageUrl} alt="Selected Image"></Image>
                    </ImageShowContainer>
                </Overlay>
            </Wrapper>
        </div>
    );
};

export default WriteNovelForm;
