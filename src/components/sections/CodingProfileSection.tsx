
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { getRandomInt } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Mock data for coding profile stats
const leetcodeStats = {
  username: "janedeveloper",
  totalSolved: 387,
  easySolved: 176,
  mediumSolved: 163,
  hardSolved: 48,
  acceptanceRate: "67.3%",
  ranking: 34567,
  contestRating: 1842,
  contestRanking: "Knight",
};

const githubStats = {
  username: "janedeveloper",
  repos: 43,
  contributions: 1287,
  followers: 128,
  following: 87,
  stars: 342,
  topLanguages: ["JavaScript", "TypeScript", "Python", "CSS", "HTML"],
};

const hackerRankStats = {
  username: "janedeveloper",
  badges: [
    { name: "Problem Solving", level: 6, stars: 5 },
    { name: "JavaScript", level: 5, stars: 5 },
    { name: "Python", level: 5, stars: 5 },
    { name: "React", level: 4, stars: 4 },
    { name: "SQL", level: 4, stars: 4 },
    { name: "Algorithms", level: 4, stars: 4 },
  ],
};

// Component to generate a GitHub-style contribution grid
const ContributionGrid = () => {
  const days = Array.from({ length: 7 * 12 }, (_, i) => i);
  
  return (
    <div className="flex flex-wrap gap-1 max-w-lg mx-auto">
      {days.map((day) => {
        // Generate random contribution count (0-4) with higher likelihood for certain days
        let intensity;
        const rand = Math.random();
        if (rand > 0.85) intensity = 4; // Very high (less likely)
        else if (rand > 0.7) intensity = 3; // High
        else if (rand > 0.5) intensity = 2; // Medium
        else if (rand > 0.3) intensity = 1; // Low
        else intensity = 0; // None
        
        return (
          <div
            key={day}
            className={`w-3 h-3 rounded-sm transition-colors duration-300 ${
              intensity === 0 ? 'bg-muted' :
              intensity === 1 ? 'bg-primary/30' :
              intensity === 2 ? 'bg-primary/50' :
              intensity === 3 ? 'bg-primary/70' :
              'bg-primary'
            }`}
            title={`${intensity} contributions`}
          />
        );
      })}
    </div>
  );
};

// HackerRank Badge Component
const HackerRankBadge = ({ 
  name, 
  level, 
  stars 
}: { 
  name: string; 
  level: number; 
  stars: number 
}) => {
  return (
    <div className="flex flex-col items-center p-3 bg-background rounded-lg border">
      <div className="text-lg font-medium mb-1">{name}</div>
      <div className="text-primary font-bold mb-2">Level {level}</div>
      <div className="flex space-x-1">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className="text-xl">
            {i < stars ? "⭐" : "☆"}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function CodingProfileSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="coding-profile" className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Coding Profiles
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My activity and achievements across various coding platforms.
          </p>
        </motion.div>

        <div ref={ref} className="space-y-16">
          {/* LeetCode Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-background rounded-lg shadow-sm border p-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="mb-4 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">LeetCode</h3>
                <p className="text-muted-foreground">
                  Profile: <a href="#" className="text-primary hover:underline">@{leetcodeStats.username}</a>
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-4xl font-bold text-primary">{leetcodeStats.totalSolved}</span>
                <span className="text-muted-foreground">Problems Solved</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <div className="text-xl font-bold">{leetcodeStats.easySolved}</div>
                <div className="text-sm text-green-500">Easy</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <div className="text-xl font-bold">{leetcodeStats.mediumSolved}</div>
                <div className="text-sm text-yellow-500">Medium</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <div className="text-xl font-bold">{leetcodeStats.hardSolved}</div>
                <div className="text-sm text-red-500">Hard</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <div className="text-xl font-bold">{leetcodeStats.acceptanceRate}</div>
                <div className="text-sm text-muted-foreground">Acceptance Rate</div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <div className="text-sm text-muted-foreground mb-1">Contest Rating</div>
                <div className="text-lg font-medium">{leetcodeStats.contestRating} ({leetcodeStats.contestRanking})</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Global Ranking</div>
                <div className="text-lg font-medium">#{leetcodeStats.ranking}</div>
              </div>
            </div>
          </motion.div>
          
          {/* GitHub Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-background rounded-lg shadow-sm border p-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="mb-4 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">GitHub</h3>
                <p className="text-muted-foreground">
                  Profile: <a href="#" className="text-primary hover:underline">@{githubStats.username}</a>
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{githubStats.repos}</div>
                  <div className="text-sm text-muted-foreground">Repositories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{githubStats.contributions}</div>
                  <div className="text-sm text-muted-foreground">Contributions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{githubStats.stars}</div>
                  <div className="text-sm text-muted-foreground">Stars</div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-4 text-center">Contribution Activity (Last 12 Weeks)</h4>
              <ContributionGrid />
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-3">Top Languages</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {githubStats.topLanguages.map((lang, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ 
                        backgroundColor: [
                          'rgba(240, 219, 79, 1)', // JavaScript (yellow)
                          'rgba(45, 121, 199, 1)',  // TypeScript (blue)
                          'rgba(53, 114, 165, 1)',  // Python (blue)
                          'rgba(86, 61, 124, 1)',   // CSS (purple)
                          'rgba(227, 76, 38, 1)',   // HTML (orange)
                        ][index] 
                      }}
                    />
                    <span className="text-sm">{lang}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* HackerRank Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-background rounded-lg shadow-sm border p-6"
          >
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold mb-2">HackerRank</h3>
              <p className="text-muted-foreground">
                Profile: <a href="#" className="text-primary hover:underline">@{hackerRankStats.username}</a>
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {hackerRankStats.badges.map((badge, index) => (
                <HackerRankBadge
                  key={index}
                  name={badge.name}
                  level={badge.level}
                  stars={badge.stars}
                />
              ))}
            </div>
          </motion.div>
          
          <div className="text-center">
            <Button size="lg" asChild>
              <Link to="/coding-profile">View Detailed Stats</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
