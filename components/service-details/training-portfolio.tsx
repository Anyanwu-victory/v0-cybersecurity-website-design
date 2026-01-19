'use client';

import { motion } from 'framer-motion';
import { Users, BookOpen, Target, BarChart3 } from 'lucide-react';

interface TrainingCategory {
  id: number;
  name: string;
  description: string;
  count: string;
}

interface PastTraining {
  id: number;
  title: string;
  audience: string;
  focus: string;
  format: string;
  attendees: number;
}

interface Service {
  trainingCategories?: TrainingCategory[];
  pastTrainings?: PastTraining[];
}

interface TrainingPortfolioProps {
  service: Service;
}

export default function TrainingPortfolio({ service }: TrainingPortfolioProps) {
  const trainingCategories = service.trainingCategories || [];
  const pastTrainings = service.pastTrainings || [];

  const categoryIcons = [BookOpen, Target, Users, BarChart3];

  return (
    <section className="container mx-auto px-4 py-24 lg:px-[80px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-24"
      >
        {/* Training Categories */}
        <div>
          <h2 className="mb-12 text-3xl font-bold md:text-5xl">Training Categories</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {trainingCategories.map((category, idx) => {
              const IconComponent = categoryIcons[idx % categoryIcons.length];
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm transition-all hover:border-[#38BDF8]/50"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 12 }}
                    className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#38BDF8]/20"
                  >
                    <IconComponent className="h-7 w-7 text-[#38BDF8]" />
                  </motion.div>

                  <h3 className="mb-2 text-xl font-bold">{category.name}</h3>
                  <p className="mb-4 text-muted-foreground">{category.description}</p>
                  <p className="text-sm font-semibold text-[#E11D2E]">{category.count}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Past Trainings */}
        <div>
          <h2 className="mb-12 text-3xl font-bold md:text-5xl">Past Trainings & Webinars</h2>

          <div className="space-y-6">
            {pastTrainings.map((training, idx) => (
              <motion.div
                key={training.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-[#E11D2E]/50 hover:bg-white/10 md:p-8"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2 flex-1">
                    <h3 className="text-lg font-bold md:text-xl">{training.title}</h3>
                    <p className="text-sm text-[#38BDF8]">{training.audience}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    <div className="rounded-lg bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        Focus
                      </p>
                      <p className="text-sm font-semibold">{training.focus}</p>
                    </div>
                    <div className="rounded-lg bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        Format
                      </p>
                      <p className="text-sm font-semibold">{training.format}</p>
                    </div>
                    <div className="rounded-lg bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        Attendees
                      </p>
                      <p className="text-sm font-semibold text-[#E11D2E]">{training.attendees}+</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
