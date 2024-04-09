import React, { useState } from 'react';
import { Form, InputNumber, Select } from 'antd';
import isInn from 'is-inn-js';
import { CustomInput, CustomButton } from '../../shared/components';
import axios from 'axios';

interface SamplesFormProps {
  onSamplesSubmit: () => void;
}

const SamplesForm: React.FC<SamplesFormProps> = ({ onSamplesSubmit }) => {
  // const [form] = Form.useForm();
  const [market, setMarket] = useState('');
  const [volumeRequest, setVolumeRequest] = useState('1');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [inn, setInn] = useState('');
  const [comments, setComments] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [productInfo, setProductInfo] = useState('');

  // const onChangeSamples = (value: number) => {
  //   console.log('changed', value);
  // };

  const sendSamples = async () => {
    await axios
      .post(
        'http://localhost:8000/API/v1/commerce/samplerequest/',
        {
          product: volumeRequest,
          volume_request: volumeRequest,
          address: address,
          market: market,
          comment: comments,
          product_info: productInfo,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        }
      )
      .then(response => {
        console.log('Ответ сервера:', response.data);
      })
      .catch(error => {
        console.error('Ошибка при отправке запроса:', error);
      });
  };

  const formData = () => {
    sendSamples();
  };

  return (
    <Form layout="vertical" onFinish={formData}>
      <Form.Item
        name="market"
        tooltip="Укажите название вашего магазина или предприятия, где будет осуществляться заказ сырья."
        label="Маркет"
        rules={[{ required: true, message: 'Выберите маркет' }]}
      >
        <Select value={market} onChange={value => setMarket(value)}>
          <Select.Option value="Industrial">Промышленный</Select.Option>
          <Select.Option value="auto">Автомобилестроение и транспорт</Select.Option>
          <Select.Option value="goods">потребительские товары</Select.Option>
          <Select.Option value="build">Здание и стройка</Select.Option>
          <Select.Option value="food">Еда и полноценное питание</Select.Option>
          <Select.Option value="electricity">Электротехника и электроника</Select.Option>
          <Select.Option value="paint">Краски и покрытия</Select.Option>
          <Select.Option value="print">Печать и упаковка</Select.Option>
          <Select.Option value="care">Личная гигиена</Select.Option>
          <Select.Option value="adhesives">Клеи и герметики</Select.Option>
          <Select.Option value="household">Бытовая химия</Select.Option>
          <Select.Option value="pharma">Здравоохранение и фармацевтика</Select.Option>
          <Select.Option value="agriculture">Сельское хозяйство и корма</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="number"
        tooltip="Укажите количество образцов компонентов, которые необходимо заказать для анализа или тестирования."
        label="Количество образцов"
        rules={[{ required: true, message: 'Введите количество образцов' }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          value={volumeRequest}
          onChange={value => setVolumeRequest(value as string)}
        />
      </Form.Item>
      <Form.Item
        label="Контактное лицо"
        tooltip="Укажите имя и контактные данные ответственного лица, с которым можно связаться для уточнения деталей заказа и доставки компонентов."
        name="contact person"
        rules={[{ required: true, message: 'Пожалуйста, введите контактное лицо' }]}
      >
        <CustomInput placeholder="" name="" onChange={setContactPerson} value={contactPerson} />
      </Form.Item>
      <Form.Item
        tooltip="Укажите точный адрес доставки сырья, чтобы мы могли доставить товар в нужное место."
        label="Адрес"
        name="address"
        rules={[{ required: true, message: 'Пожалуйста, введите свой адрес' }]}
      >
        <CustomInput placeholder="" onChange={setAddress} value={address} name="" />
      </Form.Item>

      <Form.Item
        name="phone"
        tooltip="Укажите контактный номер телефона, по которому с вами можно связаться для уточнения деталей заказа."
        label="Номер телефона"
        required
      >
        <CustomInput maxLength={10} placeholder="+7/8 (999) 999 99 99" name="" onChange={setPhone} value={phone} />
        {phone.length < 10 ? (
          <p style={{ color: '#ff8800' }}>Поле номера телефона должно содержать 10 цифр</p>
        ) : (
          <p style={{ color: '#52c41a' }}>Телефон валиден</p>
        )}
      </Form.Item>
      <Form.Item
        required
        tooltip="Укажите ваш ИНН для оформления документов и соблюдения налоговых требований."
        label="ИНН"
        name="inn"
      >
        <CustomInput maxLength={12} placeholder="" onChange={setInn} value={inn} name="INN" />
        {inn.length == 12 ? (
          isInn(inn) ? (
            <p style={{ color: '#52c41a' }}>ИНН валиден</p>
          ) : (
            <p style={{ color: '#ff4d4f' }}>ИНН не валиден</p>
          )
        ) : (
          <p style={{ color: '#ff8800' }}>Поле ИНН должно содержать 12 цифр</p>
        )}
      </Form.Item>

      <Form.Item
        required={false}
        tooltip="Дополнительная информация или специфические требования к заказу, которые необходимо учесть при его обработке."
        name="comments"
        label="Комментарии к заказу"
      >
        <CustomInput
          placeholder="Напиши несколько комментариев"
          onChange={setComments}
          value={comments}
          name="comments"
        />
      </Form.Item>

      <Form.Item
        required={false}
        tooltip="Информация об использовании сырья."
        name="product_info"
        label="Информация об использовании сырья."
      >
        <CustomInput
          placeholder="Информация об использовании сырья"
          onChange={setProductInfo}
          value={productInfo}
          name="comments"
        />
      </Form.Item>

      <Form.Item>
        <CustomButton type="primary" text="Отправить" onClick={onSamplesSubmit} />
      </Form.Item>
    </Form>
  );
};

export default SamplesForm;
