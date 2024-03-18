import React from 'react';
import './industrySector.css';

import Suppliers from '../suppliers/Suppliers';
import { industryCards, suppliers } from '../data';
import IndustryCard from '../industryCard/IndustryCard';
import { Card } from 'antd';

const IndustrySector = () => {
	return (
		<div className="wrapper">	
					<h2>Отрасли с которыми мы работаем:</h2>
					<div>
						<div className='industry-cards-wrapper'>
						{industryCards.map((industryCard) => (
						
						<Card style={{height: '200px'}}
							hoverable
							key={industryCard.title}
							// {...industryCard}
							
						>
							<img alt='' className='gridCard-img' src={industryCard.image}/>
							<div card-body>
							<p className='gridCard-title'>{industryCard.title}</p>
							</div>
							
						</Card>
					))}
						</div>
					
					</div>
			
			<div className="industrySector-suppliers">
						<h2 className="supppliers-title">
							Данные о продуктах от мировых лидеров:
						</h2>
						<div className='suppliers-cards-wrapper'>
						{suppliers.map((supplier) => (	
								<Suppliers
									key={supplier.name}
									{...supplier}
								/>
							))}
						</div>
							
							
			</div>
	
		</div>
	);
};

export default IndustrySector;
