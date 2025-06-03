"use client"

import React, { useEffect, useState } from 'react';
import { Player } from './types/types'


const PlayersTable: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.sleeper.app/v1/players/nfl');
        const data = await response.json()
        const getPlayers = Object.values(data) as Player[]
        const fifteenPlayers = getPlayers.slice(0, 14)
        setPlayers(fifteenPlayers)
      
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Position</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {players.map((e) => (
            <tr key={e.player_id}>
              <td>{e.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayersTable;

