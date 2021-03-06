import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import tinycolor from 'tinycolor2'

import moment from 'moment'

class TodayBar extends PureComponent {

    /**
     * Gets the current date
     *
     * @return {String} The current date (using momentjs)
     */
    getDate() {
        return moment().format('LLLL')
    }

    /**
     * Gets the time of day (morning, afternoon, evening)
     *
     * @return {String} The "time of day"
     */
    getDaySection() {
        if (moment().hour() < 12) {
            return "morning"
        } else if (moment().hour() >= 12 && moment().hour() < 18) {
            return "afternoon"
        } else if (moment().hour() >= 18) {
            return "evening"
        }
    }

    getUserName() {
      if (this.props.github.ghProfile !== null) {
        let fn = this.props.github.ghProfile.name.split(' ', 1)
        return fn;
      }
    }

    getComputedColor() {
        var darkened = tinycolor(this.props.color)
        return {
            backgroundColor: darkened.darken(10)
        }
    }

    render() {
        return (
            <section className="day-overview" style={ this.getComputedColor() }>
                <div className="container">
                    <div className="s12 m12">
                        <p style={{
                            lineHeight: "2em",
                            paddingTop: ".5em",
                            paddingBottom: ".5em",
                            textAlign: "center",
                            marginTop: 0
                        }}>
                            <span className={ this.props.textColor }>
                              Good { this.getDaySection() }{ this.getUserName() ? ', ' + this.getUserName() : ''}!
                            </span>
                        </p>
                    </div>
                </div>
            </section>
        )
    }
}


const mapStateToProps = (state) => {
  return {
    github: state.github,
    color: state.color,
    textColor: state.textColor
  }
}

export default connect(mapStateToProps)(TodayBar);
