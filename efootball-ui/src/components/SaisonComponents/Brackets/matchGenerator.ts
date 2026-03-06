import type {  Team } from '../../../types/types';
import { shuffleTeams } from '../../../types/functions';
import type { GeneratedMatch } from '../../../types/types';

export default function matchGenerator(teams: Team[], type: 'LEAGUE' | 'UCL') : GeneratedMatch[] {
    
   
    // Handling League tournament : RoundRobin logic 
const generateLeagueMatches = (teamsData: Team[]) => {
    const tempTeams = [...teamsData];
    if (tempTeams.length < 2) return [];

    // 1. Nombre réel de participants (avec BYE si nécessaire)
    const isOdd = tempTeams.length % 2 !== 0;
    if (isOdd) {
        tempTeams.push({ id: -1, name: "BYE" } as Team);
    }

    const numTeams = tempTeams.length;
    const numRounds = numTeams - 1; // Pour 5 équipes (+1 bye), ça fait 5 rounds
    const matchesPerRound = numTeams / 2;
    const allMatches: GeneratedMatch[] = [];

    for (let round = 0; round < numRounds; round++) {
        for (let i = 0; i < matchesPerRound; i++) {
            const home = tempTeams[i];
            const away = tempTeams[numTeams - 1 - i];

            // On n'ajoute que les matchs réels (sans BYE)
            if (home.id !== -1 && away.id !== -1) {
                allMatches.push({
                    hometeam: home,
                    awayteam: away,
                    roundNumber: round + 1,
                });
            }
        }

        // Rotation Round Robin (le premier reste fixe)
        tempTeams.splice(1, 0, tempTeams.pop()!);
    }
    console.log("Generated League Matches:", allMatches);
    
    return allMatches;
};
     
    // const teamtype = new Map(); 

    // Handling UCL tournament
   const generateUCLPhases1Matches = (teams: Team[]) => {
    const TOTAL_MATCHES_NEEDED = (teams.length * 8) / 2; 
    let attempts = 0;

    while (attempts < 100) { 
        const matches: GeneratedMatch[] = [];
        const matchCounts = new Map<number, number>();
        const history = new Set<string>();

        // Initialiser les compteurs
        teams.forEach(t => matchCounts.set(t.id, 0));

        //let possible = true;
        
       
        for (let round = 1; round <= 8; round++) {
            const roundTeams = shuffleTeams([...teams]);
            const pairedThisRound = new Set<number>();

            for (const teamA of roundTeams) {
                if (pairedThisRound.has(teamA.id) || matchCounts.get(teamA.id)! >= 8) continue;

                // Trouver un adversaire B
                const opponentB = shuffleTeams([...teams]).find(teamB => 
                    teamB.id !== teamA.id &&
                    !pairedThisRound.has(teamB.id) &&
                    matchCounts.get(teamB.id)! < 8 &&
                    !history.has(`${Math.min(teamA.id, teamB.id)}-${Math.max(teamA.id, teamB.id)}`)
                );

                if (opponentB) {
                    matches.push({
                        hometeam: teamA,
                        awayteam: opponentB,
                        roundNumber: round
                    });
                    
                    matchCounts.set(teamA.id, matchCounts.get(teamA.id)! + 1);
                    matchCounts.set(opponentB.id, matchCounts.get(opponentB.id)! + 1);
                    pairedThisRound.add(teamA.id);
                    pairedThisRound.add(opponentB.id);
                    history.add(`${Math.min(teamA.id, opponentB.id)}-${Math.max(teamA.id, opponentB.id)}`);
                }
            }
        }

        // Si on a bien nos 144 matchs, on retourne le résultat
        if (matches.length === TOTAL_MATCHES_NEEDED) {
            return matches;
        }
        attempts++;
        console.log(`Attempt ${attempts}: Generated ${matches.length} matches. Retrying...`);
    }

    alert("Erreur de génération : Trop de contraintes. Réessayez.");
    return [];
};

 if (type === 'LEAGUE') {
        return generateLeagueMatches(teams); 
    } else {
        return generateUCLPhases1Matches(teams);
    }


}
