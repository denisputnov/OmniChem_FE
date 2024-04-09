import './companyCardForm.css';
import { Button, Form, Input, Select, message } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';

const { TextArea } = Input;

function CompanyCard() {
  const sendData = async () => {
    await axios
      .post(
        'http://localhost:8000/API/v1/commerce/distributors/',
        {
          inn: inn,
          organization_structure: organization_structure,
          company_name_shortened: company_name_shortened,
          about: about,
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

  const onFinish = () => {
    sendData();
  };

  const [inn, setInn] = useState('');
  const [organization_structure, setOrganization_structure] = useState('ООО');
  const [company_name_shortened, setCompany_name_shortened] = useState('');
  const [about, setAbout] = useState('');

  return (
    <div className="supplierAccountForm-wrapper">
      <Form className="supplierDetailForm" layout="vertical" onFinish={onFinish}>
        <div className="nameCompany-wrapper">
          <Form.Item label="Краткое наименование" name="companyName">
            <Input
              className="companyNameInput"
              placeholder="Введите краткое наименование"
              value={company_name_shortened}
              onChange={e => setCompany_name_shortened(e.target.value)}
              required
            />
          </Form.Item>
          <Form.Item label="Организационная форма" name="organizationForm">
            <Select
              className="companyNameInput"
              placeholder="Например ООО"
              value={organization_structure}
              onChange={value => setOrganization_structure(value)}
              required
            >
              <Select.Option value="ooo">ООО</Select.Option>
              <Select.Option value="oao">ОАО</Select.Option>
              <Select.Option value="zao">ЗАО</Select.Option>
              <Select.Option value="pao">ПАО</Select.Option>
              <Select.Option value="ip">ИП</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <Form.Item label="ИНН" name="INN">
          <Input
            className="detailsInput"
            placeholder="Укажите ИНН вашей компании"
            type="number"
            pattern="[0-9]*"
            title="Пожалуйста, введите только цифры"
            value={inn}
            onChange={e => setInn(e.target.value)}
            required
          />
        </Form.Item>
        <Form.Item label="Описание компании" name="companyDescription">
          <TextArea
            className="detailsInput"
            style={{ maxHeight: '60px' }}
            rows={6}
            maxLength={200}
            placeholder="Введите описание компании, которое увидят клиенты"
            value={about}
            onChange={e => setAbout(e.target.value)}
          />
        </Form.Item>
        <Button
          className="supplierFormBtn"
          type="primary"
          htmlType="submit"
          style={{ width: '100%', maxWidth: '100px' }}
        >
          Сохранить
        </Button>
      </Form>
    </div>
  );
}

export default CompanyCard;
