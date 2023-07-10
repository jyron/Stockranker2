import React, { useMemo, useEffect, useState } from "react";
import { useTable, useSortBy, useFilters, useGlobalFilter } from "react-table";
import { createRoot } from "react-dom/client";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { CommentsSection, EasyComment } from '@slydragonn/react-easy-comments'
import axios from "axios";

const StockComments = () => {
  function onUpdateStock() {
//    alert("onSubmit, onUpdate, onDelete")
  }
  const User = {
    id: '001user',
    fullName: 'Fernando',
    likes: ['lily', 'chispa', 'toy'],
    dislikes: ['karla', 'larla'],
    avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
    replies: []
  };
  const Comments = [
    {
      id: '001',
      userId: '001user',
      username: 'Laper Dida',
      comment: 'One of the best stocks in the market',
      creationDate: '2022-01-01',
      likes: 5,
      dislikes: 3,
      avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
      profileLink: 'https://ui-avatars.com/api/name=Lily&background=random'
    },
    {
      id: '002',
      userId: '002user',
      username: 'The stock guy',
      comment: 'Comments!',
      creationDate: '2023-01-01',
      likes: 1,
      dislikes: 0,
      avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
      profileLink: 'https://ui-avatars.com/api/name=Lily&background=random'
    }
  ];
  return (
    <div className="centeringdiv">
      <div className="commentcard">
        <CommentsSection
          currentUser={{
            id: User.id,
            name: User.fullName,
            likes: User.likes,
            dislikes: User.dislikes,
            avatarUrl: User.avatarUrl
          }}
          initialComments={[
            Comments,
            (commentElement: any): EasyComment => ({
              commentId: commentElement.id,
              userId: commentElement.userId,
              username: commentElement.username,
              comment: commentElement.comment,
              creationDate: commentElement.creationDate,
              likes: commentElement.likes,
              dislikes: commentElement.dislikes,
              avatarUrl: commentElement.avatarUrl,
              profileLink: commentElement.profileLink
            })
          ]}
          listeners={{
            onSubmit: (comment) => onUpdateStock(),
            onUpdate: (comment) => onUpdateStock(),
            onDelete: (comment) => onUpdateStock()
          }}
          options={{}}
        />
      </div>
    </div>
  );
};

export default StockComments;
