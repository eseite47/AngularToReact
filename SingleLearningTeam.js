import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import AvatarCardDragnDrop from './AvatarCardDragnDrop'

const avatarTarget = {
	//drop should initiate the assignStudent function in the LearningTeam component based on AvatarCard dragBegins data
	drop(props, monitor, component ) {
		props.dropStudent(props.team)
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

/**
 * COMPONENT
 */
class SingleLearningTeam extends Component {
	constructor(props){
		super(props)
		this.state = {
		}
		this.renderUnassigned = this.renderUnassigned.bind(this)
	}

	renderUnassigned(team, dragStudent){
		if (Array.isArray(team)){
			return team.map((agent, studentIndex) => {
				return (
					<div key={agent._id} className="student-draggable mr2 mt1 mb1">
						<AvatarCardDragnDrop agent={agent} team={team} dragStudent={dragStudent}/>
					</div>
				)
			})
		}
	}

  render() {
		let team = this.props.team
		const {connectDropTarget, isOver, dragStudent, dropStudent} = this.props
    return connectDropTarget(
			<div className="flex flex-wrap flex-auto">
			{
				team.members && team.members.map((agent, studentIndex) => {
					return (
						<div key={agent._id} className="student-draggable mr2 mt1 mb1">
							<AvatarCardDragnDrop agent={agent} team={team} dragStudent={dragStudent}/>
						</div>
					)
				})
			}
			{ this.renderUnassigned(team, dragStudent) }
    	</div>
    )
  }
}

export default DropTarget('AVATAR', avatarTarget, collect)(SingleLearningTeam);
