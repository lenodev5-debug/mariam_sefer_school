import React from 'react';

const EntityList = ({
    items = [],
    renderItem,
    keyExtractor,
    emptyMessage = 'No items found.',
    className = '',
}) => {
    if (!items.length) {
        return (
            <div
                className={`rounded-2xl border border-dashed border-gray-300 p-10 text-center dark:border-gray-700 ${className}`}
            >
                <p className="text-sm text-gray-500">
                    {emptyMessage}
                </p>
            </div>
        );
    }

    return (
        <div
            className={`overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#151515] ${className}`}
        >
            {items.map((item, index) => (
                <React.Fragment
                    key={
                        keyExtractor
                            ? keyExtractor(
                                  item,
                                  index
                              )
                            : index
                    }
                >
                    {renderItem(item, index)}
                </React.Fragment>
            ))}
        </div>
    );
};

export default EntityList;