import VariablesAndConstants from "./VariablesAndConstants.tsx";
import VariableTypes from "./VariablesTypes.tsx";
import BooleanVariables from "./BooleanVariables.tsx";
import IfElse from "./IfElse.tsx";
import TernaryOperator from "./TernaryOperator.tsx";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse.tsx";
import LegacyFunctions from "./LegacyFunctions.tsx";
import ConditionalOutputInline from "./ConditionalOutputInline.tsx";
import ArrowFunctions from "./ArrowFunctions.tsx";
import ImpliedReturns from "./ImpliedReturns.tsx";
import TemplateLiterals from "./TemplateLiterals.tsx";
import SimpleArrays from "./SimpleArrays.tsx";
import ArrayIndexAndLength from "./ArrayIndexAndLength.tsx";
import AddingAndRemovingToFromArrays from "./AddingAndRemovingToFromArrays.tsx";
import ForLoops from "./ForLoops.tsx";
import MapFunction from "./MapFunction.tsx";
import FindFunction from "./FindFunction.tsx";
import FilterFunction from "./FilterFunction.tsx";
import JsonStringify from "./JsonStringify.tsx";
import House from "./House.tsx";
import TodoItem from "./todos/TodoItem.tsx";
import TodoList from "./todos/TodoList.tsx";
import Spreading from "./Spreading.tsx";
import Destructing from "./Destructing.tsx";
import FunctionDestructing from "./FunctionDestructing.tsx";
import DestructingImports from "./DestructingImports.tsx";
import Classes from "./Classes.tsx";
import Styles from "./Styles.tsx";
import Add from "./Add.tsx";
import Square from "./Square.tsx";
import Highlight from "./Highlight";
import PathParameters from "./PathParameters.tsx";
import { useSelector } from "react-redux";
import {ListGroup} from "react-bootstrap";

export default function Lab3() {
    console.log('Hello World!');
    const { todos } = useSelector((state: any) => state.todosReducer);
    return (
        <div id="wd-lab3">
                <h3>Lab 3</h3>
                <VariablesAndConstants/>
                <VariableTypes/>
                <BooleanVariables/>
                <IfElse/>
                <TernaryOperator/>
                <ConditionalOutputIfElse/>
                <ConditionalOutputInline/>
                <LegacyFunctions/>
                <ArrowFunctions/>
                <ImpliedReturns/>
                <TemplateLiterals/>
                <SimpleArrays/>
                <ArrayIndexAndLength/>
                <AddingAndRemovingToFromArrays/>
                <ForLoops/>
                <MapFunction/>
                <FindFunction/>
                <FilterFunction/>
                <JsonStringify/>
                <House/>
                <TodoItem/>
                <TodoList/>
                <Spreading/>
                <Destructing/>
                <FunctionDestructing/>
                <DestructingImports/>
                <Classes/>
                <Styles/>
                <Add a={3} b={4}/>
                <h4>Square of 4</h4>
                <Square>4</Square>
                <hr/>
                <Highlight>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
                        vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
                </Highlight>
                <PathParameters/>

            <ListGroup>
                {todos.map((todo: any) => (
                    <ListGroup.Item key={todo.id}>
                        {todo.title}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <hr />
        </div>
    );
}
