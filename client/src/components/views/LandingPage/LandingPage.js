import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

function LandingPage(props) {
    const onClickHandler = () => {
        axios.get('/api/users/logout')
        .then(response => {
            if(response.data.success) {
                props.history.push('/login')
            } else {
                alert('logout fail')
            }
        })
    }
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', aliginItems: 'center', width: '100%', height: '100vh'
        }}>
            <h2>시작페이지</h2>
            <button onClick={onClickHandler}>
                로그 아웃
            </button>         
        </div>
    )
}

export default withRouter(LandingPage)
