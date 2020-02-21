import React, { FC, useRef, useState, useEffect } from 'react';
import useForceUpdate from 'use-force-update';
import './App.css';
import { content, addContent, selectAll } from './content';
import Child from './Child';

const App: FC = () => {
  const forceUpdate = useForceUpdate();

  const [filterType, setFilterType] = useState('All');

	const refInput = useRef<HTMLInputElement>(null);
	const refCheckbox = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (content.length === content.filter((item) => item.isShowed === true).length) {
			refCheckbox.current!.checked = true;
		}
		else refCheckbox.current!.checked = false;
	})

  const block = () => {
		switch (filterType) {
			case 'All':
				return content.map((item, index) => {
					return <Child item={item} index={index} key={item.id} forceUpdate={forceUpdate} />;
				});
			case 'Done':
				return content.map((item, index) => {
					return item.isShowed ? (
						<Child item={item} index={index} key={item.id} forceUpdate={forceUpdate} />
					) : (
						[]
					);
				});
      case 'Undone':
				return content.map((item, index) => {
					return !item.isShowed ? (
						<Child item={item} index={index} key={item.id} forceUpdate={forceUpdate} />
					) : (
						[]
					);
				});
			default:
				return [];
		}
  };

  return (
		<div className="App">
			<input
				type="text"
				ref={refInput}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						addContent(Math.random(), refInput.current!.value, false);
						forceUpdate(); //вызываю ререндер компонента, аналог this.forceUpdate()
					}
				}}
			/>
			<p>
				<input
					type="checkbox"
					ref={refCheckbox}
					onChange={(e) => {
						e.target.checked ? selectAll(true) : selectAll(false);
						forceUpdate();
					}}
				/>
				<span>Выбрать всё</span>
			</p>

			<p>
				<span>Показать</span>
				<select
					defaultValue="All"
					onChange={(e) => {
						setFilterType(e.target.value);
					}}
				>
					<option value="All">All</option>
					<option value="Done">Done</option>
					<option value="Undone">Undone</option>
				</select>
			</p>
			<hr />

			{block().map((item: any) => item)}
		</div>
  );
}

export default App;
