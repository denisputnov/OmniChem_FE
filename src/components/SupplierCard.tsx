import React from "react";

import { CustomButton } from "./CustomButton";

import { CollapseBlock } from "./CollapseBlock";
import { CollapseProps } from "antd";

import styled from "styled-components";
import { CustomCard } from "./MaterialCard/CustomCard";

interface MaterialCardProps {
  items: CollapseProps["items"];
  sampleRequest: () => void;
  quoteRequest: () => void;
  informationRequest: () => void;
}

export const SupplierCard: React.FC<MaterialCardProps> = ({
  items,
  sampleRequest,
  quoteRequest,
  informationRequest
}) => {
  return (
    <CustomCard>
      <CollapseBlock items={items} />
      <div>
        <p>Цена</p>
        <p style={{ fontSize: "15px", color: "#505050" }}>
          Доступна по ценовому предложению
        </p>
      </div>

      <RequestWrapper>
        <CustomButton
          type="default"
          text="Запросить ценовое предложение"
          onClick={quoteRequest}
        />
        <CustomButton
          type="primary"
          text="Запросить образец"
          onClick={sampleRequest}
        />
        <CustomButton type="text" text="Дополнительная информация" onClick={informationRequest} />
      </RequestWrapper>
    </CustomCard>
  );
};

const RequestWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;

  width: 100%;
`;

export default SupplierCard;
