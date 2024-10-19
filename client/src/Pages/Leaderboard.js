import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BaseUrl from '../BaseUrl'

const Leaderboard = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Fetch leaderboard data from the API
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/user/leaderboardnew`)
        setUsers(response.data)
        setLoading(false)
      } catch (err) {
        setError('Error fetching leaderboard data')
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl font-bold text-red-500 text-center mb-10">
        Leaderboard
      </h1>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-gray-900 text-white rounded-lg">
          <thead className="bg-gray-700 text-left">
            <tr>
              <th className="py-4 px-6">Rank</th>
              {/*<th className="py-4 px-6">Team ID</th>*/}
              <th className="py-4 px-6">Team Leader</th>
              <th className="py-4 px-6">Points</th>
              <th className="py-4 px-6">Money</th>
              <th className='py-4 px-6'>Time</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.teamId}
                className={`${
                  index === 0
                    ? 'bg-yellow-500'
                    : index === 1
                    ? 'bg-gray-400'
                    : index === 2
                    ? 'bg-yellow-800'
                    : 'bg-gray-800'
                } hover:bg-gray-600 border-b border-gray-700`}
              >
                <td className="py-3 px-6">{user.rank || index + 1}</td>
                {/*<td className="py-3 px-6">{user.teamId}</td>*/}
                <td className="py-3 px-6">{user.teamLeader.name}</td>
                <td className="py-3 px-6">{user.points}</td>
                <td className="py-3 px-6">₹{user.money}</td>
                {/* <td className="py-3 px-6">{user.choiceTime}</td> */}
                <td className="py-3 px-6">
                  {new Date(user.choiceTime).toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaderboard
