import styles from "./FilterDropdown.module.css";
import { filterData } from "../../utils/filterData";
import { useState } from "react";

export default function FilterDropdown(props) {
  const [openCategories, setOpenCategories] = useState({});
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  const isExpanded = Object.values(openCategories).some(Boolean);

  //____ TOGGLE THE CATEGORY DROPDOWN ____
  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  //___ TOGGLE THE CHECKBOX ___
  const toggleCheckbox = (item) => {
    setSelectedCheckbox((prev) =>
      prev.includes(item)
        ? prev.filter((checkBox) => checkBox !== item)
        : [...prev, item]
    );
  };

  //____ APPLY BUTTON HANDLER ____
  const onApplyFilter = () => {
    props.onApplyFilter(selectedCheckbox);
  };


  //____ CLEAR FILTERS BUTTON HANDLER _____
    const onClearFilter = () => {
    setSelectedCheckbox([]);
    props.onApplyFilter([]); 
  };

  return (

    //___ WHEHN THE FILTER CONTAINER IS OPEN A LIST OF CATEGORIES WITH DROPDOWNS ARE RENDERED.
    //...  WHEN A CATEGORY DROPDOWN IS CLICKED, EACH CATEGORY RETURNS A CHECKBOX ICON, SERVICE NAME, LIST OF GROUPED SERVICES AND A STYLE CLASSNAME.
    //... THE CHECKBOX IMAGES ARE CONDITIONALLY RENDERED BETWEEN ACTIVE AND INACTIVE, ON CLICK.
    <div
      className={`${styles.filterContainer} ${
        isExpanded ? styles.expanded : ""
      }`}
    > 
      {filterData.map(({ category, icon, items, style }) => {
        const isOpen = openCategories[category];

        return (
          <ul key={category} className={styles.card}>
            <li
              className={styles[style]}
              onClick={() => toggleCategory(category)}
            >
              <h4 className={styles.categoryTitle}>
                <img src={icon} alt="" />
                {category}
              </h4>
            </li>
            {isOpen &&
              items.map((item, index) => (
                <li key={index} className={styles[`${style}Name`]}>
                  <div className={styles.checkBoxContainer}>
                    <img
                      onClick={() => toggleCheckbox(item)}
                      src={
                        selectedCheckbox.includes(item)
                          ? "/assets/icons/misc/CheckboxActive.png"
                          : "/assets/icons/misc/CheckboxInactive.png"
                      }
                      alt=""
                      className={styles.checkboxIcon}
                    />
                    <p className={styles.serviceLabel}>{item.label}</p>
                  </div>
                </li>
              ))}
          </ul>
        );
      })}
      {/* ____ THESE ARE THE BUTTONS THAT WILL CLEAR FILTERS OR APPLY FILTERS _____ */}
      <div className={styles.filterButtons}>
        <button className={styles.clearBtn} onClick={onClearFilter}>
          Clear Filter ( {selectedCheckbox.length} )
        </button>
        <button className={styles.applyBtn} onClick={onApplyFilter}>
          Apply Filter ( {selectedCheckbox.length} )
        </button>
      </div>
    </div>
  );
}
