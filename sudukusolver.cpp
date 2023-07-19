#include<bits/stdc++.h>
using namespace std;


void print_board(int board[][9],int n){
    for(int i=0;i<n;i++){
        for(int j=0;j<n;j++){
            cout<<board[i][j]<<" ";
        }
        cout<<endl;
    }cout<<endl;
}

bool isValid(int board[][9],int row,int col,int n,int num){
    //check in row:
    for(int i=0;i<n;i++){
        if(board[row][i]==num) return false;
    }
    //check in col:
    for(int i=0;i<n;i++){
        if(board[i][col]==num) return false;    
    }
    //check in sub grid:
    int temp=sqrt(n);
    int r=row/temp;
    r*=temp;
    int c=col/temp;
    c*=temp;

    for(int i=0;i<3;i++){
        for(int j=0;j<3;j++){
            if(board[i+r][j+c]==num) return false;
        }
    }
    return true;

}
bool sudukusolver(int board[][9],int row,int col,int n){
    if(row==n){
        print_board(board,n);
        return true;
    }
    
    if(col>=n){
        return sudukusolver(board,row+1,0,n);
    }
    if(board[row][col]!=0) {
        return sudukusolver(board,row,col+1,n);
    }
    for(int i=1;i<=n;i++){
        
        if(isValid(board,row,col,n,i)){
            board[row][col]=i;
            bool tempans=sudukusolver(board,row,col+1,n);
            if(tempans) return tempans;
            //backtracking (undo the changes)
            board[row][col]=0;
        }

    }return false;

}

int main(){
    int board[9][9]={
        {0,0,7,1,0,0,0,6,0},{1,0,5,2,0,8,0,0,0},{6,0,0,0,0,7,1,2,0},
        {3,1,2,4,0,5,0,0,8},{0,0,6,0,9,0,2,0,0},{0,0,0,0,0,3,0,0,1},
        {0,0,1,0,0,4,9,8,6},{8,0,3,9,0,6,0,0,0},{0,6,0,0,8,2,7,0,3}
    };
    int n=9;
    sudukusolver(board,0,0,n);
    return 0;
}
