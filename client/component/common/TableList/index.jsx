/**
 * @file countdown
 * @author Mofei Zhu <zhuwenlong@baidu.com>
 */
/* globals requestAnimationFrame */
import React from 'react';

require('./index.scss');

class App extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            activeId: null
        };
        this.transition = '';
        this.createLists = this.createLists.bind(this);
        this.getHeight = this.getHeight.bind(this);
        this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(next) {
      if(next.collapsed !== this.props.collapsed) {
        this.transition = next.collapsed ? 'transition-list-reverse' : 'transition-list'
        this.isAuto = false;
      }
      this.setState({
          activeId: next.activeId
      })
    }

    componentDidUpdate() {
      this.transition = ''
    }

    setActive(id) {
        this.setState({
            activeId: Number(id)
        });
    }

    createTitle() {
        let columns = this.props.columns.map((column, index) => (
            <td key={`listtitle-${index}`} style={column.headStyle}>
                <p className="list-content-title">{column.name}</p>
            </td>
        ));

        var item = <td key="listtitle" style={{width: '2.5rem'}}></td>
        columns.unshift(item);
        return <table className="list-title-table">
            <thead>
            <tr>{columns}</tr>
            </thead>
        </table>;
    }

    createLists() {
        let self = this;
        let activeId = this.props.activeId ;

        if (!this.props.datas || this.props.datas.length == 0) {
            return <div style={{
                textAlign: 'center',
                paddingTop: '0.5rem'
            }}>暂无数据</div>;
        }

        return this.props.datas.map((data, index) => {
            var descriptionComponent = '';
            if (data.describe) {
                descriptionComponent = <span className="list-name" ref={"description" + index}>
                    <span
                        className="list-name-description"
                        style={{ display: data.describe ? '' : 'none' }}
                    >
                        {data.describe}
                    </span>
                </span>
            }
            let keyDatas = data.datas.map((keydata, keyindex) => (
                <td key={`sbutitle-${index}-${keyindex}`} style={self.props.columns[keyindex].bodyStyle}>
                    <p>{keydata}</p>
                </td>
            ));

            var item = <td key={`sbutitle-${index}`} style={{width: '2.5rem'}}>
                <p><span className="list-name-icon" style={{backgroundColor: data.indexColor || null}}>{index + 1}</span></p>
            </td>
            keyDatas.unshift(item);

            var isActive = false;
            if (Object.prototype.toString.call(activeId) === '[object Array]') {
                if (activeId.indexOf(index) >= 0) {
                    isActive = true;
                }
            } else if (activeId === index) {
                isActive = true;
            }

            return (
                <button
                    key={`road_${index}`}
                    onTouchTap={() => {
                        self.props.onClick && self.props.onClick(data, index);
                    }}
                    onMouseEnter={() => {
                        self.props.onMouseEnter && self.props.onMouseEnter(data, index);
                    }}
                    onMouseLeave={() => {
                        self.props.onMouseLeave && self.props.onMouseLeave(data, index);
                    }}
                >
                    <li className={isActive ? 'active' : ''} onMouseEnter={()=>{
                        self.setActive(index);
                    }} >
                        <div className="list-content list-content-3">
                            <table className="list-content-table">
                                <tbody>
                                    <tr>
                                        {keyDatas}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {descriptionComponent}
                    </li>
                </button>
            );
        })
    }

    getHeight (collapsed) {
      if(typeof collapsed === 'boolean') {
        if(collapsed === true) {
          return parseFloat(document.documentElement.style.fontSize) * (1.75 * 3 + 6) + 2 + 'px'
          // 隐藏状态下高度为三行高度加上2px的border高度
        }
        return parseFloat(document.documentElement.style.fontSize) * (1.75 * this.props.datas.length + 5) + this.props.datas.length - 1 + 'px'
        // 显示状态下高度为本身高度
      }
      return null
    }

    handleTransitionEnd() {
      if(this.props.collapsed) {
        this.props.collapseDataList()
      }
    }


    render() {
        let list = this.createLists();
        let title = this.createTitle();
        return (
            <div className="cc-tablelist">
                {title}
                <ul className={"cc-datalist-list "+this.transition} ref="ul" style={{
                  height: 'auto',
                  maxHeight:  this.getHeight(this.props.collapsed)
                }}
                onTransitionEnd={this.handleTransitionEnd}
                >
                    {list}
                </ul>
            </div>
        )
    }
}

export default App;
