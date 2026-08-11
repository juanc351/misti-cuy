"use server";

import {
  getAdminProfileData,
  saveAdminProfileData,
} from "../services/profile.service";

import type {
  AdminProfile,
  AdminProfileInput,
} from "../types/profile.types";

export async function getAdminProfileAction(): Promise<AdminProfile | null> {
  return getAdminProfileData();
}

export async function saveAdminProfileAction(
  data: AdminProfileInput,
): Promise<AdminProfile> {
  return saveAdminProfileData(data);
}