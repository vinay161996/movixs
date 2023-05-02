import { useState } from 'react'
import './SwitchTabs.scss'

const SwitchTabs = ({ data, onTabChange }) => {

    const [selectTab, setSelectTab] = useState(0)
    const [left, setLeft] = useState(0)

    const activeTab = (item, index) => {
        setLeft(index * 100);
        setTimeout(() => {
            setSelectTab(index);
        }, 300);
        onTabChange(item, index);
    }

    return (
        <div className='switchingTabs' >
            <div className="tabItems">
                {data.map((item, index) => (
                    <span
                        onClick={() => activeTab(item, index)}
                        key={index}
                        className={`tabItem ${selectTab === index ? 'active' : ""}`} >
                        {item}
                    </span>
                ))}
                <span className="movingBg" style={{ left }} />
            </div>
        </div>
    )
}

export default SwitchTabs
