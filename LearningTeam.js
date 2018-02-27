import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import AvatarCard from '../agent/avatarCard.component'
import SingleLearningTeam from './SingleLearningTeam'

/**
 * COMPONENT
 */
class LearningTeam extends Component {

	//State keeps track of avatars being draged from an oldTeam to a new Team
	constructor(props){
		super(props)
		this.state = {
			user: null,
			oldTeam: null
		}
		this.dragStudent = this.dragStudent.bind(this)
		this.dropStudent = this.dropStudent.bind(this)
	}

	//Keep track of an avatar's original team
	dragStudent(user, oldTeam){
		this.setState({user: user, oldTeam: oldTeam})
	}

	//handle drop using drop function in the Single learning team view and data stored on this state
	dropStudent(newTeam){
		if(newTeam !== this.state.oldTeam){
			this.state.oldTeam.removeMember(this.state.user.agent)
			.then(()=>{
				return newTeam.addMember(this.state.user.agent)
			})
			.then(()=>{
				this.setState({user: null, oldTeam: null})
			})
			.catch(()=> console.log('there was an error'))
		}
	}

  render() {
    return (
      <div>
        <div className="learningTeam">
  				<input type="text"
    				placeholder="Add Fellow Team..."
    				className="field"
						/>
  				<div className="container mx-auto mt1">
					{this.props.teams.map((team) => {
      			return (
							<div className="border mb3" key={team._id}>
								<div className="p2"> 
									<div className="flex"> 
										<div className="mr1">
											<AvatarCard agent={team.fellow} size="tiny" />
										</div>
										<a href={team.sref()}>
											<p className="h3">{team.name}</p>
										</a>
									</div> 
									<SingleLearningTeam team={team} dragStudent={this.dragStudent} dropStudent={this.dropStudent}/>
							</div>
						</div> )
						})
					}
					<div className="border">
						<div className="p2">
							<p className="h3">Unassigned Students</p>
							<SingleLearningTeam team={this.props.unassigned} dragStudent={this.dragStudent} dropStudent={this.dropStudent}/>
						</div>
					</div>
				</div>
			</div>
		</div>
    )
  }
}

export default DragDropContext(HTML5Backend)(LearningTeam);
