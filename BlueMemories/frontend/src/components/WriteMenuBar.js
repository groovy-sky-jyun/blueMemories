import styled from "styled-components";
import React from 'react';

const ImageContainer=styled.div`
    width:100%;
    height:5vw;
    /*item 설정*/
    position:relative;
`;

const BottomImage = styled.div`
    width: 100%;
    height: 10vw;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url("/resourcesPng/writeNovelPage/menubar2.png");
    /*순서*/
    position: absolute;
    z-index: 1;
`;
const TopImage = styled.div`
    width: 100%;
    height: 5vw;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url("/resourcesPng/writeNovelPage/menubar1.png");
    /*순서*/
    position: absolute;
    z-index: 2;
`;
//메뉴 버튼 컨테이너
const MenuBarContainer=styled.div`
    width:90%;
    height:auto;
    /*item 설정*/
    display: flex;
    justify-content: space-between;
    align-items: center;
    top:7%;
    left:5vw;
    /*순서*/
    position:absolute;
    z-index:3;
`;

// 메뉴 그룹 (왼쪽 혹은 오른쪽 메뉴)
const MenuGroup = styled.div`
    width: fit-content;
    display: flex;
    gap: 3rem; // 메뉴 아이템 사이의 간격
`;

// 메뉴 아이템
const MenuItem = styled.button`
    /*마우스 HOVER 설정*/
    cursor: pointer;
    &:active {
      color: #9CC3B1;
    }
    /*스타일*/
    border: none;
    font-size: 2.3vw;
    font-family: gangwonedusaeeum, sans-serif; //대체폰트
    /*크기*/
    height: auto;
    width: auto;
    /*색상*/
    background: none;
    color: #FFFFFF;
    
`;
//로그인 했을 때 네비게이션 바
const WriteMenuBar=()=>{
    // const navigate = useNavigate();
    // const goToMain=()=>{
    //     navigate("/");
    // }
    // const goToIntroduce=()=>{
    //     navigate("/introduce");
    // }
    // const goToStorageNovel=()=>{
    //     navigate("/storageNovel");
    // }
    // const goToStorageExchangeDiary=()=>{
    //     navigate("/storageExchangeDiary");
    // }
    // const goToStorageDiary=()=>{
    //     navigate("/storageDiary");
    // }
    // const goToStorageDrawBook=()=>{
    //     navigate("/storageDrawBook");
    // }
    return (
        <ImageContainer>
            <BottomImage></BottomImage>
            <TopImage></TopImage>
            <MenuBarContainer>
                <MenuGroup>
                    <MenuItem>책 완성</MenuItem>
                    <MenuItem>책 표지</MenuItem>
                    <MenuItem>임시저장</MenuItem>
                </MenuGroup>
                <MenuGroup>
                    <MenuItem>저장하고 나가기</MenuItem>
                </MenuGroup>
            </MenuBarContainer>
        </ImageContainer>
    );
};
export {WriteMenuBar};

