export interface IContent {
  id: number,
  title: string,
  isShowed: boolean,
}

let content: Array<IContent> = [
	{
		id: Math.random(),
		title: 'Первый ToDo',
		isShowed: false
	},
	{
		id: Math.random(),
		title: 'Второй ToDo',
		isShowed: false
	},
	{
		id: Math.random(),
		title: 'Третий ToDo',
		isShowed: false
	}
];

const addContent = (id: number, title: string, isShowed: boolean): void => {
	content.push({ id, title, isShowed });
};

const deleteContent = (id: number): void => {
	content.splice(id, 1);
};

const selectAll = (status: boolean): Array<IContent> => {
	return content.map((item) => {
    item.isShowed = status;
    return item;
	});
};

const changeStatus = (index: number, status: boolean): Array<IContent> => {
	content[index].isShowed = status;
	return content;
};

export { content, addContent, deleteContent, selectAll, changeStatus };