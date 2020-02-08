import React from 'react';
import Header from "../../app/layout/shared/Header";
import './DashboardPageStyle.css'

const DashboardPage = () => {
    return (
        <div>
            <Header/>
            <div className='cc-container'>
                <div className='cc-card'>
                    <div className='cc-card-content'>
                        <div className='cc-card-title'>
                            Dashboard
                        </div>
                        <div className='cc-card-subtitle'>
                            cool page description
                        </div>
                        <div className='dashboard-page-grid'>
                            <div className='dashboard-page-item'>yo1</div>
                            <div className='dashboard-page-item'>yo1</div>
                            <div className='dashboard-page-item'>yo1</div>
                            <div className='dashboard-page-item'>yo1</div>
                            <div className='dashboard-page-item'>yo1</div>
                            <div className='dashboard-page-item'>yo1</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
