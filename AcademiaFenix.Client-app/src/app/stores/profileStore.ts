import { Photo, Profile, Userstudent as UserStudent } from "../models/profile"
import { makeAutoObservable, reaction, runInAction } from "mobx"

import agent from "../api/agent";
import { store } from "./store";

export default class ProfileStore {
    currentUserProfile: Profile | null = null;
    profile: Profile | null = null;
    loadingProfile = false;
    uploading = false;
    loading = false;
    followings: Profile[] = [];
    loadingFollowings: boolean = false;
    activeTab = 0;
    userStudent: UserStudent[] = [];
    loadingStudents = false;
    constructor() {
        makeAutoObservable(this);
        reaction(() => this.activeTab,
            activeTab => {
                if (activeTab === 3 || activeTab === 4) {
                    const predicate = activeTab === 3 ? 'followers' : 'followings';
                    this.loadFollowings(predicate);
                } else {
                    this.followings = []
                }
            })

    }

    setActiveTab = (activeTab: number) => {
        this.activeTab = activeTab;

    }

    get isCurrentUser() {
        if (store.userStore.user && this.profile) {
            return store.userStore.user.userName === this.profile.userName;
        }
        return false;
    }

    loadProfile = async (userName: string) => {
        console.log('loadProfile')
        console.log(userName)
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.get(userName);
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false
            })
        } catch (error) {
            console.log(error)
        }
    };

    uploadPhoto = async (file: Blob) => {
        this.uploading = true;
        try {
            const response = await agent.Profiles.uploadPhoto(file);
            const photo = response.data;
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos?.push(photo);
                    if (photo.isMain && store.userStore.user) {
                        store.userStore.setImage(photo.url);
                        this.profile.image = photo.url;
                    }
                }
                this.uploading = false;
            })

        } catch (error) {
            console.log(error)
            runInAction(() => this.uploading = false);
        }
    };

    setMainPhoto = async (photo: Photo) => {
        this.loading = true;
        try {
            await agent.Profiles.setMainPhoto(photo.id);
            store.userStore.setImage(photo.url);
            runInAction(() => {
                if (this.profile && this.profile.photos) {
                    this.profile.photos.find(p => p.isMain)!.isMain = false;
                    this.profile.photos.find(p => p.id === photo.id)!.isMain = true;
                    this.profile.image = photo.url;
                    this.loading = false;
                }

            })
        } catch (error) {
            runInAction(() => { this.loading = false })
        }
    }

    deletePhoto = async (photo: Photo) => {
        this.loading = true;
        try {
            await agent.Profiles.deletePhoto(photo.id);
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos = this.profile.photos?.filter(x => x.id !== photo.id);
                    this.loading = false;
                }
            })


        } catch (error) {
            console.log(error);
            runInAction(() => { this.loading = false });
        }
    }

    updateProfile = async (profile: Partial<Profile>) => {
        this.loading = true;
        try {
            await agent.Profiles.updateProfile(profile);
            runInAction(() => {
                if (profile.displayName
                    && profile.displayName !== store.userStore.user?.displayName) {
                    store.userStore.setDisplayName(profile.displayName);
                }
                this.profile = { ...this.profile, ...profile as Profile };
                this.loading = false;
            })

        } catch (error) {
            console.log(error);
            runInAction(() => { this.loading = false });
        }
    }

    updateFollowing = async (userName: string, following: boolean) => {
        this.loading = true;
        try {
            await agent.Profiles.updateFollowing(userName);
            store.studentStore.updateAttendeeFollowing(userName);
            runInAction(() => {
                if (this.profile
                    && this.profile.userName !== store.userStore.user?.userName
                    && this.profile.userName === userName) {
                    following
                        ? this.profile.followersCount++
                        : this.profile.followersCount--;
                    this.profile.following = !this.profile.following;
                }
                if (this.profile
                    && this.profile.userName === store.userStore.user?.userName) {
                    following
                        ? this.profile.followingCount++
                        : this.profile.followingCount--;

                }
                this.followings.forEach(profile => {
                    if (profile.userName === userName) {
                        profile.following
                            ? profile.followersCount--
                            : profile.followersCount++
                        profile.following = !profile.following;
                    }
                })
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => { this.loading = false })
        }
    }

    loadFollowings = async (predicate: string) => {
        console.log('predicate: ', predicate)
        this.loadingFollowings = true;
        try {
            const followings = await agent.Profiles.listFollowings(this.profile!.userName, predicate);
            runInAction(() => {
                this.followings = followings;
                this.loadingFollowings = false

            })
        } catch (error) {
            console.log(error);
            runInAction(() => { this.loadingFollowings = false })
        }
    }

    loadUserStudents = async (userName: string, predicate?: string) => {
        this.loadingStudents = true;
        try {
            const students = await agent.Profiles.listStudents(userName, predicate!);
            runInAction(() => {
                this.userStudent = students;
                this.loadingStudents = false;
            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingStudents = false;
            })
        }
    }
}