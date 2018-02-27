'use strict';

import { DragSource } from 'react-dnd'
import React, {Component} from 'react'
import AvatarCard from '../agent/avatarCard.component'

const avatarSource = {
  //function beginDrag should send data to LearningTeams to keep track of old team and user
  beginDrag(props, monitor, component) {
		props.dragStudent(props, component.props.team)
		return {};
	}
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

//Drag and Drop Wrapper for AvatarCard
class AvatarCardDragnDrop extends Component {
	constructor(props){
		super(props)
		this.state = {
			isExpanded: true,
			editable: true,
			showName: true,
			size: 'medium'
		}
	}

  render(){
  const { agent, team, connectDragSource, isDragging, dragStudent} = this.props;
  return connectDragSource(
    <div key={'DragNDrop' + agent._id}>
    	<AvatarCard agent={agent} isExpanded={this.state.isExpanded} showName={this.state.showName} size={this.state.size} team={team}/>
    </div>
  )}
}

export default DragSource('AVATAR', avatarSource, collect)(AvatarCardDragnDrop);
