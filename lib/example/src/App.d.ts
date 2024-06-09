import * as React from 'react';
import type { SelectionChangeData, TextChangeData } from 'react-native-cn-quill';
export default class App extends React.Component<any, any> {
    private _editor;
    constructor(props: any);
    getCurrentDate(): string;
    handleEnable: () => void;
    handleGetHtml: () => void;
    handleSelectionChange: (data: SelectionChangeData) => Promise<void>;
    handleTextChange: (data: TextChangeData) => void;
    customHandler: (name: string, value: any) => void;
    render(): JSX.Element;
}
