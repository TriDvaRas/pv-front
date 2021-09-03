/* eslint-disable @typescript-eslint/no-unused-vars */
import { Badge, Card, Col, Row } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useEffect, useState } from "react";
import { players } from "../fakedb";
import { IPlayer, ITeam } from "../../@types/custom";
import seedrandom from "seedrandom";
import { randomSeededColor } from "../../util/colors";
import EditableLabel from "../text/EditableLabel";

interface Props {
    id: string;
    team: ITeam;
    nameField?: 'name' | 'username' | 'tag';
    saturation?: number;
    onTitleChange: (newValue: string) => any
}
export default function DropRowTeam(props: Props) {
    const { team, onTitleChange } = props
    return <Droppable droppableId={props.id} direction="vertical">
        {(provided, snapshot) => (
            <Card
                bg='dark-750'
                ref={provided.innerRef}
                className={`text-light border border-${team.players.length !== 2 && team.title !== `Unassigned` ? `danger` : `dark`} h-100 mx-3 p-1`}
                {...provided.droppableProps}
            >
                <Card.Header>
                    {
                        team.title !== `Unassigned` ?
                            <EditableLabel value={team.title} onSave={onTitleChange} /> :
                            <h4 >{team.title || `No Team Name`} </h4>
                    }
                </Card.Header>
                {/* <h3 className='mb-0'> </h3> */}
                <Card.Body>
                    {team.players.map((item, index) => (
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