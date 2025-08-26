import './styles.css';
import { possibleMoves, Node } from './modules/knight-travails';

const test = new Node(1, 3);

possibleMoves(test);
console.log(test);
