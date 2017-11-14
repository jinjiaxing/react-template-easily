/**
 * @file PageTest.jsx
 * @desc 组件展示页面
 * @create 18/11/14.
 * @author jinjiaxing
 */
/** lib **/
import * as React from 'react';
/**resources**/
import './_pageTest.scss';
import img1 from './img/img1.jpg';
import img2 from './img/img2.jpg';
import img3 from './img/img3.jpg';
import img4 from './img/img4.jpg';
/**component**/
import Button from '../../component/common/Button/Button.jsx';
import Tab from '../../component/common/Tab/Tab.jsx';
import Header from '../../component/common/Header/Header.jsx';
import MarqueeText from '../../component/common/MarqueeText/MarqueeText.jsx';
import Panel from '../../component/common/Panel/Panel.jsx';
import InputField from '../../component/common/InputField/InputField.jsx';
import Switch from '../../component/common/Switch/Switch.jsx';
import SelectField from '../../component/common/SelectField/SelectField.jsx';
import Toast from '../../component/common/Toast/Toast.jsx';
import Loading from '../../component/common/Loading/Loading.jsx';
import Menu from '../../component/common/Menu/Menu.jsx';
import Slider from '../../component/common/Slider/Slider.jsx';
import Collapse from '../../component/common/Collapse/Collapse.jsx';
import ImageSlider from '../../component/common/ImageSlider/ImageSlider.jsx'
/**other**/
const Image = ImageSlider.Image;
const MenuItem = Menu.MenuItem;
const TabPane = Tab.TabPane;
const defaultSliderValue = 0;

class PageTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisiable: false,
            operation_isVisiable: false,
            sliderDisplayValue: defaultSliderValue
        }
    }

    showAlert() {
        this.setState({isVisiable: true});
    }

    showOperationAlert() {
        this.setState({operation_isVisiable: true});
    }

    onCloseClickHandler() {
        this.setState({isVisiable: false});
    }

    onOkClickHandler() {
        this.setState({isVisiable: false});
    }

    onCancelClickHandler() {
        this.setState({isVisiable: false});
    }

    closeClickHandler() {
        this.setState({operation_isVisiable: false});
    }

    imgClickHandler() {
        this.setState({operation_isVisiable: false});
    }

    closeBanner(e) {
        e.target.parentElement.style.display = 'none';
    }

    onItemClick(children) {
        console.log(children);
    }

    render() {
        return (
            <div>
                <Header back={true} titleName="React Component"/>

                {/*Test Component Section*/}
                <div className="component_container">

                    <Panel title="Tab组件:">
                        <Tab>
                            <TabPane tabTitle='tabTitle1' tabKey='1' defaultSelected>content1</TabPane>
                            <TabPane tabTitle='tabTitle2' tabKey='2' disabled>content2</TabPane>
                            <TabPane tabTitle='tabTitle3' tabKey='3'>content3</TabPane>
                        </Tab>
                    </Panel>

                    <Panel title="带Icon的Tab组件">
                        <Tab>
                            <TabPane tabTitle='主页' tabKey='1' defaultSelected iconName="home">主页</TabPane>
                            <TabPane tabTitle='分类' tabKey='2' iconName="classify">分类</TabPane>
                            <TabPane tabTitle='订单' tabKey='3' iconName="order">订单</TabPane>
                            <TabPane tabTitle='个人中心' tabKey='4' iconName="mine" hidden={false}>个人中心</TabPane>
                        </Tab>
                    </Panel>

                    <Panel title="Button组">
                        <div>
                            <Button text='文字按钮' onClick={(e) => {
                                console.log(111, e)
                            }}/>
                        </div>
                        <div style={{marginTop: '15px'}}>
                            <Button text='按钮不可用' isDisable/>
                        </div>

                        <div style={{marginTop: '15px'}}>
                            <Button iconClass={'btnIcon'} type='iconButton' text='带图标的Button'/>
                        </div>

                    </Panel>

                    <Panel title="Marquee组件">
                        <MarqueeText marqueeData={['aaa', 'bbb', 'ccc']}/>
                    </Panel>

                    <Panel title="SelectField">
                        <SelectField/>
                    </Panel>

                    <Panel title="SwitchField">
                        <Switch/>
                    </Panel>

                    <Panel title="Toast组件">
                        <Button text='弹出Toast' onClick={(e) => {
                            Toast.toastInstance('react-template-easily', 1500);
                        }}/>
                    </Panel>

                    <Panel title="Loading组件">
                        <Button text='Loading' onClick={() => {
                            Loading.show();
                            setTimeout(() => {
                                Loading.disappear();
                            }, 3000);
                        }}/>
                        <p style={{fontSize: '15px', marginTop: '10px'}}>这里,设置Loading 3s后自动消失</p>
                    </Panel>

                    <Collapse title="Menu组件" defaultFolded={true}>
                        <Panel>
                            <Menu>
                                <MenuItem onItemClick={this.onItemClick}>
                                    <Button iconClass={'btnIcon'} type='iconButton' text='text1'/>
                                </MenuItem>
                                <MenuItem>text2</MenuItem>
                                <MenuItem>text3</MenuItem>
                                <MenuItem>text4</MenuItem>
                            </Menu>
                        </Panel>
                    </Collapse>

                    <Panel title="Slider组件">
                        <Slider max={80} min={0} defaultValue={defaultSliderValue} sliderWidth={14} fixed={1}
                                onChange={(value) => {
                                    this.setState({sliderDisplayValue: value});

                                }}/>
                        <span className="sliderDisplayValue">{this.state.sliderDisplayValue}</span>
                    </Panel>

                    <Panel title="ImageSlider组件">
                        <ImageSlider>
                            <Image src={img1}></Image>
                            <Image src={img2}></Image>
                            <Image src={img3}></Image>
                            <Image src={img4}></Image>
                        </ImageSlider>
                    </Panel>


                </div>

            </div>
        )
    }
}

export default PageTest;


