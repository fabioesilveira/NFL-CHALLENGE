"use client"

import axios from "axios";
import { useEffect, useState } from "react"

type Player = {
  position: string,
  full_name: string,
  player_id: string,
  team: string
}

export default function Home() {
  
  const[player, setPlayer] = useState<Player[] | null>(null);

  useEffect(() => {
    async function fetchApi() {
      try {
        const req = await axios.get("https://api.sleeper.app/v1/players/nfl")
        const allPlayers = Object.values(req.data) as Player [];
        const fifteenPlayers = allPlayers.slice(0, 10);
        setPlayer(fifteenPlayers);
      } catch (error) {
        console.error("Error to load", error)
      }
    }
    fetchApi();
  }, [])
  
  return (
    <>
    <table>
      <thead>
        <tr>
          <th>Player</th>
          <th>Position</th>
          <th>Team</th>
        </tr>
      </thead>
      <tbody>
        {!player ? 
        <tr>
          <td colSpan={3}>Loading..</td>
        </tr> : 
        player.map((e) => (
          <tr key={e.player_id}>
            <td>{e.full_name}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}