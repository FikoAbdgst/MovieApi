import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import '../navigation.css'

const Dropdown2 = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
    }

    const handleMouseLeave = () => {
        setIsOpen(false);
    }



    return (
        <div className="dropdown cursor-pointer max-md:hidden  text-white" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className={`dropdown-btn ${isOpen ? 'active' : ''}`}> <a href="#"> DropTwo <FontAwesomeIcon icon={faCaretDown} /></a></div>
            {isOpen && (
                <ul className="dropdown-menu  text-sm absolute z-50 ">
                    <li><FontAwesomeIcon icon={faCaretRight} /> <a href="#"> Menu 1</a> </li>
                    <li><FontAwesomeIcon icon={faCaretRight} /> <a href="#"> Menu 2</a></li>
                    <li><FontAwesomeIcon icon={faCaretRight} /> <a href="#"> Menu 3</a></li>
                </ul>
            )}
        </div>
    );
}

export default Dropdown2;
