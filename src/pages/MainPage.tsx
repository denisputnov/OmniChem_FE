import { MessageOutlined, SearchOutlined } from "@ant-design/icons";
import { PaginationProps, Select, Popover, Spin } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import json from "../const/data2.json";
import styled from "styled-components";
import CollapseBlock from "../components/CollapseBlock";
import CustomButton from "../components/CustomButton";
import CustomPagination from "../components/CustomPagination";
import Header from "../components/Header";
import CustomInput from "../components/Input/CustomInput";
import MaterialCard from "../components/MaterialCard/MaterialCard";
import { http } from "../const/http";
import useDebounce from "../hooks/useDebounce";
import { Material, MaterialResponse } from "../types/pagesTypes";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";

const MainPage = () => {
  const [materials, setMaterials] = useState<Material[]>(json.results);
  const [total, setTotal] = useState(50);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(16)
  const debouncedMaterial = useDebounce(materials, 100000);
  const [isLoading, setIsLoading] = useState(false)

  const onChangePage: PaginationProps["onChange"] = (page: number) => {
    
    setPage(page);
  };

  const onChangeSizePage: PaginationProps['onShowSizeChange'] = (current: number, size: number) => {
    
    setPageSize(size)
  };
  useEffect(() => {
    // axios({
    //   method: "get",
    //   url: "",
    //   responseType: "stream",
    // }).then(function (response) {
    //   setMaterials(response.data);
    // });
    setIsLoading(true)
    const fetchData = async () => {
      
      const response = await http.get<MaterialResponse>(
        `API/v1/wiki/materials/?page=${page}&page_size=${pageSize}`
      );
      setTotal(response.data.count);
      setMaterials(response.data.results);
      setIsLoading(false)
    };
    fetchData();
    
  }, [page, debouncedMaterial, pageSize]);

  // useEffect(() => {});
  // Решит ли проблему заедания кнопки развертывания карточки сырья?

  const navigate = useNavigate();

  // Контент окна чата
  // const messages = ["string"];
  // console.log(messages);
  const [chatMessage, setChatMessage] = useState("");
  const chatWindow = (
    <ChatBotWindow>
      <MessagesWindow>
        <BotMessage>Привет я Бот!</BotMessage>
        <UserMessage>Скоко будет 2+2?</UserMessage>
        <BotMessage>Я думаю...</BotMessage>
        {/* {messages.map((message) => (
          <UserMessage>{message}</UserMessage>
        ))} */}
      </MessagesWindow>
      <ChatBotFooter>
        <CustomInput
          name="chatInput"
          placeholder="Напишите свой вопрос"
          onChange={setChatMessage}
          value={chatMessage}
        />

        <CustomButton text="Отправить" type="primary" />
      </ChatBotFooter>
    </ChatBotWindow>
  );

  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  };

  const filtersItems = [
    {
      key: 1,
      label: <p>Фильтры</p>,
      children: (
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Select
            placeholder="Химическое семейство"
            labelInValue
            style={{ width: "100%" }}
            onChange={handleChange}
            options={[
              {
                value: "1",
                label: "Filter 1",
              },
              {
                value: "2",
                label: "Filter 2",
              },
            ]}
          />
          <Select
            placeholder="Особенности"
            labelInValue
            style={{ width: "100%" }}
            onChange={handleChange}
            options={[
              {
                value: "1",
                label: "Filter 1",
              },
              {
                value: "2",
                label: "Filter 2",
              },
            ]}
          />
          <Select
            placeholder="Конечное использование"
            labelInValue
            style={{ width: "100%" }}
            onChange={handleChange}
            options={[
              {
                value: "1",
                label: "Filter 1",
              },
              {
                value: "2",
                label: "Filter 2",
              },
            ]}
          />
          <Select
            placeholder="Поставщики"
            labelInValue
            style={{ width: "100%" }}
            onChange={handleChange}
            options={[
              {
                value: "1",
                label: "Filter 1",
              },
              {
                value: "2",
                label: "Filter 2",
              },
            ]}
          />
          <Select
            placeholder="Совместимые подложки и поверхности"
            labelInValue
            style={{ width: "100%" }}
            onChange={handleChange}
            options={[
              {
                value: "1",
                label: "Filter 1",
              },
              {
                value: "2",
                label: "Filter 2",
              },
            ]}
          />
          <Select
            placeholder="Готовый к использованию продукт"
            labelInValue
            style={{ width: "100%" }}
            onChange={handleChange}
            options={[
              {
                value: "1",
                label: "Filter 1",
              },
              {
                value: "2",
                label: "Filter 2",
              },
            ]}
          />
        </div>
      ),
    },
  ];

  const onCardClick = (materialId: number) => {
    navigate(`/material/${materialId}`);
  };

  
  return (
    <>
    <ErrorBoundary>
    {
      isLoading ? <Spin fullscreen={true} size="large"/> : <></>
    }
      <FloatButtonContainer>
        <Popover
          style={{}}
          content={chatWindow}
          title="Задайте вопрос OmniChem"
          trigger="click"
        >
          <CustomButton
            style={{ height: "100%", width: "100%", fontSize: "25px" }}
            icon={<MessageOutlined />}
            type="primary"
            shape="circle"
          />
        </Popover>
      </FloatButtonContainer>

      <Header>
        <h1>OmniChem</h1>
        <CustomInput
          name=""
          placeholder="Введите то, что вы хотите найти"
          onChange={() => {}}
          value={""}
          addonBefore={<SearchOutlined />}
        />
      </Header>
      <PageWrapper>
        <FiltersContainer>
          <CollapseBlock items={filtersItems}>
            <CustomButton text="Фильтры" type="primary" />
          </CollapseBlock>
        </FiltersContainer>

        <PaginationContainer style={{ marginBottom: "0" }}>
          <CustomPagination
          defaultPageSize={16}
          showQuickJumper={true}
          pageSize={pageSize}
          pageSizeOptions={[8, 16, 24]}
            onShowSizeChange={onChangeSizePage}
            current={page}
            simple={false}
            
            onChange={onChangePage}
            total={total}
          />
          
        </PaginationContainer>
        <MaterialsList>
          {materials.map((material: Material) => (
            <MaterialCard
              link={`/material/${material.id}`}
              id={material.id}
              isHaveSupplier={material.is_supplier_available}
              onCardClick={onCardClick}
              key={material.id}
              manufacturerName={material.values[1].values[0].value}
              materialName={material.value}
              description={material.values[0].values[0].translated_value}
              readyToUseProductType={
                material.values[8].values[0].translated_value
              }
              chemicalFamily={material.values[3].values[0].translated_value}
              compatibleSubstratesAndSurfaces={
                material.values[4].values[0].translated_value
              }
              features={material.values[6].values[0].translated_value}
            />
          ))}
        </MaterialsList>
        <PaginationContainer>
        <CustomPagination
          defaultPageSize={16}
          showQuickJumper={true}
          pageSizeOptions={[8, 16, 24]}
            onShowSizeChange={onChangeSizePage}
            current={page}
            simple={false}
            pageSize={pageSize}
            onChange={onChangePage}
            total={total}
          />
        </PaginationContainer>
      </PageWrapper>
    </ErrorBoundary>
    
    </>
  );
};

export default MainPage;

const PaginationContainer = styled.div`
  margin: 0 auto;
  margin-bottom: 60px;
`;

const ChatBotWindow = styled.div`
  height: 300px;
  width: 300px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MessagesWindow = styled.div`
  background-color: #d7d7d7;
  border-radius: 10px;
  height: 100%;

  box-sizing: border-box;
  padding: 10px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2) inset;
`;

const ChatBotFooter = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  align-items: center;
`;

const BotMessage = styled.div`
  padding: 5px 15px;
  background-color: #00a99d;
  color: #ffffff;

  border-radius: 10px 10px 10px 0;
`;

const UserMessage = styled.div`
  padding: 5px 15px;
  background-color: #ffffff;

  border-radius: 10px 10px 0 10px;
`;

const FloatButtonContainer = styled.div`
  position: fixed;
  top: 90%;
  left: 95%;

  width: 50px;
  height: 50px;

  z-index: 10;

  @media (max-width: 620px) {
    top: 85%;
    left: 80%;
  }
`;

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;

  margin: 0 auto;
  max-width: 1440px;

  @media (min-width: 320px) and (max-width: 768px) {
    display: flex;

    gap: 20px;

    max-width: 310px;

    .dropDown {
      width: 100%;
    }
  }
`;

const MaterialsList = styled.div`
  max-width: 1440px;

  display: grid;
  /* grid-auto-rows: minmax(min-content, max-content); */
  grid-gap: 1rem;

  padding-bottom: 30px;

  @media (min-width: 620px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 930px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1240px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1550px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 40px;
  min-width: 600px;

  border-radius: 5px;
  outline: 1px solid #6386a5;
  overflow: hidden;
  &:hover {
    outline: 1px solid #383a3b;
  }
  &:focus-within {
    outline: 1px solid #383a3b;
  }
  /* border: 1px solid #383a3b; */
`;

export const Categories = styled.div`
  height: 100%;

  flex: 1;

  background-color: #ffffff;
`;

export const InputIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 40px;

  padding: 10px;
  box-sizing: border-box;
  background-color: #ffffff;
`;

export const VerticalDivider = styled.div`
  width: 0px;
  height: 24px;
  border-style: solid;
  border-width: 0px 0px 0px 2px;
  border-color: rgb(204, 204, 204);
`;

export const InputWrapper = styled.div`
  flex: 2;
`;

const FiltersContainer = styled.div`
  width: 100%;

  @media (min-width: 320px) and (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    max-width: 310px;

    .dropDown {
      width: 100%;
    }
  }

  @media (min-width: 768px) and (max-width: 992px) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    max-width: 768px;

    /* .dropDown {
      width: 100%;
    } */
  }

  @media (min-width: 992px) {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
`;
