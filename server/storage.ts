import { type User, type InsertUser, type GameMap, type InsertMap } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getMap(id: string): Promise<GameMap | undefined>;
  getAllMaps(): Promise<GameMap[]>;
  createMap(map: InsertMap): Promise<GameMap>;
  updateMap(id: string, map: Partial<InsertMap>): Promise<GameMap | undefined>;
  deleteMap(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private maps: Map<string, GameMap>;

  constructor() {
    this.users = new Map();
    this.maps = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getMap(id: string): Promise<GameMap | undefined> {
    return this.maps.get(id);
  }

  async getAllMaps(): Promise<GameMap[]> {
    return Array.from(this.maps.values());
  }

  async createMap(insertMap: InsertMap): Promise<GameMap> {
    const id = randomUUID();
    const now = new Date().toISOString();
    const map: GameMap = {
      ...insertMap,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.maps.set(id, map);
    return map;
  }

  async updateMap(id: string, updates: Partial<InsertMap>): Promise<GameMap | undefined> {
    const existingMap = this.maps.get(id);
    if (!existingMap) return undefined;

    const updatedMap: GameMap = {
      ...existingMap,
      ...updates,
      id,
      createdAt: existingMap.createdAt,
      updatedAt: new Date().toISOString(),
    };
    this.maps.set(id, updatedMap);
    return updatedMap;
  }

  async deleteMap(id: string): Promise<boolean> {
    return this.maps.delete(id);
  }
}

export const storage = new MemStorage();
