import styled from 'styled-components';

import { useEffect, useState } from 'react';
import { ArrowLeftOutlined, FilePdfOutlined, FileWordOutlined, LoadingOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router';
import { http } from '../shared/const/http';
import { MaterialPageType, MaterialTable, MaterialTableRows } from '../shared/types/pagesTypes';
import '../styles/loading.css';
import { columns } from '../shared/const/tableData';
import { DataType } from '../shared/types/componentsTypes';
import { Alert, Divider, Input, Modal, Spin, notification } from 'antd';

import QuoteForm from './DrawerPages/QuoteForm';
import SamplesForm from './DrawerPages/SamplesForm';
import { useAuth } from '../contexts/authContext';
import { CustomButton, CustomDrawer, SupplierCard, CustomTable } from '../shared/components';
const { TextArea } = Input;

interface Supplier {
  id: number;
  name: string;
  availability_status: string;
}

export const MaterialDescriptionPage: React.FC = () => {
  const { isAuthorized } = useAuth();
  const [material, setMaterial] = useState<MaterialPageType>();
  const [isLoading, setIsLoading] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const materialDescription = await http.get<MaterialPageType>(`API/v2/wiki/materials/${id}/`);

      const suppliersResponse = await http.get(`API/v1/commerce/materials/${id}/distributors/`);
      setMaterial(materialDescription.data);
      setSuppliers(suppliersResponse.data);

      setIsLoading(false);
    };

    fetchData();
  }, [id]);
  const navigate = useNavigate();
  const [openQuoteRequest, setOpenQuoteRequest] = useState(false);
  const [openSampleRequest, setOpenSampleRequest] = useState(false);

  const openNotification = () => {
    notification.open({
      message: 'Только авторизованные пользователи могут взаимодействовать с поставщиками',
      description: 'Пожалуйста, зарегистрируйтесь на сайте или войдите со своими учетными данными',
      placement: 'topRight',
    });
  };

  const showQuoteRequest = () => {
    if (!isAuthorized) {
      openNotification();
    } else {
      setOpenQuoteRequest(true);
    }
  };

  const showSampleRequest = () => {
    if (!isAuthorized) {
      openNotification();
    } else {
      setOpenSampleRequest(true);
    }
  };

  const onCloseQuoteRequest = () => {
    setOpenQuoteRequest(false);
  };

  const onCloseSampleRequest = () => {
    setOpenSampleRequest(false);
  };

  const [quoteFormStage, setQuoteFormStage] = useState(1);
  const [samplesFormStage, setSamplesFormStage] = useState(1);

  const submitQuote = () => {
    setQuoteFormStage(2);
  };

  const submitSamples = () => {
    setSamplesFormStage(2);
  };

  const [isOpenInfReqModal, setIsOpenInfReqModal] = useState(false);
  const openReqModal = () => {
    if (!isAuthorized) {
      openNotification();
    } else {
      setIsOpenInfReqModal(true);
    }
  };

  const closeReqModal = () => {
    setIsOpenInfReqModal(false);
  };
  return (
    <div>
      <Modal
        open={isOpenInfReqModal}
        title="Напишите интересующий вас вопрос сдесь"
        onCancel={closeReqModal}
        footer={false}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <TextArea rows={4} />
          <Alert message="Помимо вашего вопроса, мы отправим поставщику данные о вас: имя, фамилия и ИНН. Предоставление этих данных при запросе к поставщику поможет обеспечить более качественное обслуживание и улучшить коммуникацию." />
          <CustomButton text="Отправить" type="primary"></CustomButton>
        </div>
        {/* В дальнейшем при клике в модалке должен быть получен id поставщика что бы отправить ему запрос, получить его надо из карточки */}
      </Modal>
      <CustomDrawer
        open={openQuoteRequest}
        onClose={onCloseQuoteRequest}
        size="default"
        placement="right"
        title="Запрос ценового предложения"
      >
        {quoteFormStage == 1 ? (
          <QuoteForm onQuoteSubmit={() => submitQuote()} />
        ) : (
          <div>
            <p>Ваш запрос был отправлен поставщику</p>
            <CustomButton type="default" onClick={() => location.reload()} text="Продолжить" />
          </div>
        )}
      </CustomDrawer>
      <CustomDrawer
        open={openSampleRequest}
        onClose={onCloseSampleRequest}
        size="default"
        placement="right"
        title="Запрос образца"
      >
        {samplesFormStage == 1 ? (
          <SamplesForm onSamplesSubmit={() => submitSamples()} />
        ) : (
          <div>
            <p>Ваш запрос был отправлен поставщику</p>
            <CustomButton type="default" onClick={() => location.reload()} text="Продолжить" />
          </div>
        )}
      </CustomDrawer>
      {isLoading ? (
        <Spin style={{ zIndex: '9' }} indicator={<LoadingOutlined />} fullscreen={true} size="large" />
      ) : (
        <div>
          <PageWrapper style={{ alignItems: 'flex-start', paddingTop: '40px' }}>
            <MaterialHeader>
              <CustomButton type="primary" shape="round" icon={<ArrowLeftOutlined />} onClick={() => navigate('/')} />
              <h2>{material?.name}</h2>
            </MaterialHeader>

            <DescriptionBlock>
              <FeatureLine>{material?.translated_description}</FeatureLine>
            </DescriptionBlock>
            <Divider style={{ margin: 0 }} />
            <h2>Документы:</h2>
            {isAuthorized ? (
              <div>
                {material?.documents.map(document => {
                  return (
                    <div>
                      {document.name.substring(document.name.length - 3) == 'pdf' ? (
                        <DocumentWrapper>
                          <FilePdfOutlined style={{ fontSize: '30px' }} />

                          <a style={{ fontSize: '20px' }} href={document.document}>
                            {document.name}
                          </a>
                        </DocumentWrapper>
                      ) : (
                        <DocumentWrapper>
                          <FileWordOutlined />
                          <a href={document.document}>{document.name}</a>
                        </DocumentWrapper>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <Alert message="Только зарегистрированные пользователи могут видеть документы по сырью" />
            )}
            <Divider style={{ margin: 0 }} />
            <h2>Поставщики:</h2>
            {isAuthorized ? (
              <div>
                <ScrollableList>
                  {suppliers?.map(supplier => {
                    return (
                      <SupplierCard
                        availability={supplier.availability_status}
                        key={supplier.id}
                        cardTittle={supplier.name}
                        sampleRequest={showSampleRequest}
                        quoteRequest={showQuoteRequest}
                        informationRequest={openReqModal}
                      />
                    );
                  })}
                </ScrollableList>
              </div>
            ) : (
              <Alert message="Только зарегистрированные пользователи могут видеть поставщиков сырья" />
            )}
          </PageWrapper>
          <FullSpecsBG>
            <FullSpecsWrapper>
              {material?.attributes?.map(attribute => (
                <>
                  <FeatureWrapper>
                    <FeatureNameContainer>
                      <FeatureName>{attribute.attribute_name}:</FeatureName>
                    </FeatureNameContainer>
                    <FeatureLineContainer key={`featureLineContainer:${attribute.attribute_name}`}>
                      {attribute.attribute_values.map(attributeValues => (
                        <FeatureLine>{attributeValues}</FeatureLine>
                      ))}
                    </FeatureLineContainer>
                  </FeatureWrapper>
                  <Divider style={{ margin: 0 }} />
                </>
              ))}
              {material?.tables.map((table: MaterialTable) => {
                const tableData = table.table_rows.map((table_row: MaterialTableRows) => {
                  const rowData: DataType = {
                    key: table_row.field_name,
                    name: table_row.field_name,
                    value: table_row.field_value,
                    unit: table_row.units,
                    method: table_row.test_method,
                  };
                  return rowData;
                });
                return <CustomTable size="large" columns={columns} data={tableData} />;
              })}
              <Line />
            </FullSpecsWrapper>
          </FullSpecsBG>
        </div>
      )}
    </div>
  );
};

const DocumentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  height: 50px;
`;

const PageWrapper = styled.div`
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
const FeatureNameContainer = styled.div`
  width: 360px;
`;
const FeatureLineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const FeatureWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  @media (min-width: 320px) and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 20px;

    max-width: 310px;
  }
`;

const FullSpecsBG = styled.div`
  background-color: #fbfbfb;
  width: 100%;
  margin-top: 40px;
`;

const MaterialHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  max-width: 1440px;

  align-items: center;
`;

const Line = styled.div`
  border-bottom: 1px solid #d6d6d6;
  width: 100%;
`;

const FullSpecsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  margin: 0 auto;
  max-width: 1440px;

  padding-top: 30px;

  overflow-wrap: break-word;

  @media (min-width: 320px) and (max-width: 768px) {
    display: flex;
    gap: 20px;

    max-width: 310px;

    .dropDown {
      width: 100%;
    }
  }

  background-color: #fbfbfb;
`;

const DescriptionBlock = styled.p`
  display: flex;
  flex-direction: column;
  gap: 10px;

  max-width: 1440px;

  p:first-child {
    margin-bottom: 30px;
    font-size: 19px;
  }
  margin: none;
`;

const FeatureLine = styled.p`
  color: #505050;
`;

const FeatureName = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #505050;
`;

export const ScrollableList = styled.div`
  width: 100%;
  padding: 10px 10px 50px 10px;

  display: flex;
  flex-direction: row;
  gap: 20px;

  box-sizing: border-box;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  box-shadow: 0px 0px 10px 2px rgba(255, 255, 255, 0.2) inset;
`;
