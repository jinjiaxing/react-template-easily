import React from 'react';
import Tablelist from './index.jsx';

let datas = [
    {
        title: '管庄路',
        describe: '从管庄路辅路到朝阳路',
        datas: ['海淀区', '2.58', '0.37km/h', '3km', ]
    },
    {
        title: '管庄路',
        describe: '从管庄路辅路到朝阳路',
        datas: ['朝阳区', '2.58', '0.37km/h', '3km', ]
    }, {
        title: '管庄路',
        describe: '从管庄路辅路到朝阳路',
        datas: ['西城区', '2.58', '0.37km/h', '3km', ]
    }
]

var columns = [
    {
        name: '行政区',
        bodyStyle: {
            width: '100px',
            fontSize: '16px',
            textAlign: 'left',
            fontWeight: 'bold',
            color: '#333'
        },
        headStyle: {
            width: '100px',
            textAlign: 'left'
        }
    },
    {
        name: '拥堵指数',
        bodyStyle: {
            color: '#999',
            width: '60px'
        },
        headStyle: {
            width: '60px'
        }
    },
    {
        name: '平均速度',
        bodyStyle: {
            color: '#999',
            width: '60px'
        },
        headStyle: {
            width: '60px'
        }
    },
    {
        name: '拥堵距离',
        bodyStyle: {
            color: '#999',
            width: '60px'
        },
        headStyle: {
            width: '60px'
        }
    }
];

const example = () => {
    return (
        <div className="content-box">
            <Tablelist 
                datas={datas}
                activeId={[0]}
                columns={columns}
                onClick={(val, index) => {
                    console.log(val, index)
                }} 
                onMouseEnter={(val, index) => {
                    console.log(val, index)
                }} 
                onMouseLeave={(val, index) => {
                    console.log(val, index)
                }}
            />
        </div>
    )
}

export default example;
