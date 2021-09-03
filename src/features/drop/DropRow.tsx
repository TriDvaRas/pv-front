/* eslint-disable @typescript-eslint/no-unused-vars */
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Badge, Card } from "react-bootstrap";
import { IPlayer } from "../../@types/custom";
import { randomSeededColor } from "../../util/colors";

interface Props {
    id: string;
    items: Array<IPlayer>;
    title: string;
    nameField?: 'name' | 'username' | 'tag';
    saturation?: number;
}
export default function DropRow(props: Props) {
    return <Droppable droppableId={props.id} direction="vertical">
        {(provided, snapshot) => (
            <Card
                ref={provided.innerRef}
                className='bg-dark text-light border border-dark h-100 my-3 p-1'
                {...provided.droppableProps}
            >
                <Card.Header>
                    <h3 className='mb-0'>{props.title} </h3>
                </Card.Header>
                <Card.Body>
                    {props.items.map((item, index) => (
                        <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                            {(provided, snapshot) => (
                                <div
                                    className='my-auto'
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <Badge
                                        bg=''
                                        pill
                                        className='fs-4 my-2 w-100'
                                        style={{ backgroundColor: randomSeededColor(item.name, props.saturation), transition: `background-color .4s ease-out` }}
                                    >
                                        {item[props.nameField || 'username']}
                                    </Badge>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </Card.Body>
            </Card>
        )}
    </Droppable>
}