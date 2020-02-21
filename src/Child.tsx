import React, { FC } from 'react';
import { deleteContent, changeStatus } from './content';
import { IContent } from './content';

type ChildProps = {
  item: IContent;
  index: number;
  forceUpdate: any,
}

const Child: FC<ChildProps> = ({ item, index, forceUpdate }) => {

	return (
		<div className="wrapper">
			<input
				type="checkbox"
				checked={item.isShowed}
        onChange={() => {
          changeStatus(index, !item.isShowed);
          forceUpdate();
				}}
			/>
			<span>{item.isShowed ? <s>{item.title}</s> : item.title}</span>
			<input
				type="button"
				defaultValue="Удалить"
				onClick={() => {
					deleteContent(index);
					forceUpdate();
				}}
			/>
		</div>
	);
};

export default Child;
