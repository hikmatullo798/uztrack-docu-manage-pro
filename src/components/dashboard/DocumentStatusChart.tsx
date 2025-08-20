import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DocumentStatusData {
  name: string;
  value: number;
  color: string;
}

const data: DocumentStatusData[] = [
  { name: "Xavfsiz", value: 16, color: "#22c55e" },
  { name: "Ogohlantiruv", value: 7, color: "#eab308" },
  { name: "Muddati tugagan", value: 6, color: "#1f2937" }
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, name
}: any) => {
  const radius = outerRadius + 30;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent * 100 < 5) return null;

  return (
    <g>
      <text 
        x={x} 
        y={y-8} 
        fill="hsl(var(--foreground))" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={13}
        fontWeight="600"
      >
        {name}
      </text>
      <text 
        x={x} 
        y={y+8} 
        fill="hsl(var(--muted-foreground))" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="500"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    </g>
  );
};

export function DocumentStatusChart() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>📊</span>
          <span>Hujjatlar Holati</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                stroke="hsl(var(--background))"
                strokeWidth={3}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    style={{
                      filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `${value} ta hujjat`, 
                  name
                ]}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--popover))',
                  color: 'hsl(var(--popover-foreground))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Custom Legend */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {data.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
              <div 
                className="w-3 h-3 rounded-full shadow-sm" 
                style={{ backgroundColor: entry.color }}
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{entry.name}</p>
                <p className="text-xs text-muted-foreground">{entry.value} ta</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}