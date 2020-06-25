import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpBackend } from '@angular/common/http';
import { Subject } from 'rxjs';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Projects } from '../../interfaces/projects';
import { ProjectDetails } from '../../interfaces/project-details';
import { Communities } from '../../interfaces/communities';
import { Rewards } from '../../interfaces/rewards';
import { BankStatus } from 'src/app/interfaces/bank-status';
import { Contributors } from 'src/app/interfaces/contibutors';



@Injectable({
  providedIn:'root'
})

export class ProjectsService {

  apiUrl = 'http://127.0.0.1:8000';
  errorData: {};
  redirectUrl: string;
  // comingData: Observable<any>;
  // private comingDataSubject = new Subject<any>();
  
private http: HttpClient;

constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
   // this.comingData = this.comingDataSubject.asObservable();
}

  // public dataSender(data) {
  //   console.log(data); 
  //   this.comingDataSubject.next(data);
  // }

  public getProjects(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/getProjects`,{
      headers: {'Content-Type':'application/json'}
    }).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  public validateProject(id): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/validateProject/${id}`,{
      headers: {'Content-Type':'application/json'}
    }).pipe(map(this.extractData),
    catchError(this.handleError)
  );
} 

  public getProjectById(id): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/getProjectById/${id}`,{
      headers: {'Content-Type':'application/json'}
    }).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  public getUserProjects(userId): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/getUserProjects/${userId}`,{
      headers: { Authorization: `Bearer ${this.getAuthorizationToken()}`}
    }).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  public getProjectDetailsByProjectId(id): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/getProjectDetailsByProjectId/${id}`,{
      headers: {'Content-Type':'application/json'}
    }).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  public getProjectAllDetailsById(id): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/getProjectAllDetailsById/${id}`,{
      headers: {'Content-Type':'application/json'}
    }).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  public createProject( project: Projects):Observable<any> {
    console.log(project)
    return this.http.post(`${this.apiUrl}/api/createProject`,project, {
      headers: { Authorization: `Bearer ${this.getAuthorizationToken()}`}
    }).pipe(map(this.extractData),
    catchError(this.handleError)
  );

  } 

  public updateProject( project: Projects, id ):Observable<any> {
    console.log(project)
    return this.http.put(`${this.apiUrl}/api/updateProjectById/${id}`,project, {
      headers: { Authorization: `Bearer ${this.getAuthorizationToken()}`}
    }).pipe(map(this.extractData),
    catchError(this.handleError)
  );

  }

  public deleteProject( id ):Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/deleteProjectById/${id}`,{
      headers: { Authorization: `Bearer ${this.getAuthorizationToken()}`}
    }).pipe(map(this.extractData),
    catchError(this.handleError)
  );
} 

  public addProjectDetail( projectDetails: ProjectDetails):Observable<any> {
      console.log(projectDetails)
      return this.http.post(`${this.apiUrl}/api/addProjectDetails`,projectDetails, {
        headers: { Authorization: `Bearer ${this.getAuthorizationToken()}`}
      }).pipe(map(this.extractData),
      catchError(this.handleError)
    );

  } 

  public updateProjectDetail( projectDetails: ProjectDetails, id):Observable<any> {
    console.log(projectDetails)
    return this.http.put(`${this.apiUrl}/api/updateProjectDetailsByProjectId/${id}`,projectDetails, {
      headers: { Authorization: `Bearer ${this.getAuthorizationToken()}`}
    }).pipe(map(this.extractData),
    catchError(this.handleError)
  );

} 

public getCommunitiesById(id):Observable<any> {
  return this.http.get(`${this.apiUrl}/api/getCommunitiesByProjectId/${id}`,{
    headers: {'Content-Type':'application/json'}
  }).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

  public addCommunities( communities: Communities):Observable<any> {
    console.log(communities)
    return this.http.post(`${this.apiUrl}/api/addCommunities`,communities, {
      headers: { Authorization: `Bearer ${this.getAuthorizationToken()}`}
    }).pipe(map(this.extractData),
    catchError(this.handleError)
  );
}

public updateCommunities( communities: Communities, id):Observable<any> {
  console.log(communities)
  return this.http.put(`${this.apiUrl}/api/updateCommunitiesByProjectId/${id}`,communities, {
    headers: { Authorization: `Bearer ${this.getAuthorizationToken()}`}
  }).pipe(map(this.extractData),
  catchError(this.handleError)
);
}

public getProjectRewardsByProjectId(idProject): Observable<any> {
  return this.http.get(`${this.apiUrl}/api/getProjectRewardsByProjectId/${idProject}`,{
    headers:  {'Content-Type':'application/json'}
  }).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

public getProjectRewardsById(idReward): Observable<any> {
  return this.http.get(`${this.apiUrl}/api/getProjectRewardsById/${idReward}`,{
    headers:  {'Content-Type':'application/json'}
  }).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

public addProjectReward( rewards: Rewards):Observable<any> {
  console.log(rewards)
  return this.http.post(`${this.apiUrl}/api/addProjectReward`,rewards, {
    headers:{ Authorization: `Bearer ${this.getAuthorizationToken()}`}
  }).pipe(map(this.extractData),
  catchError(this.handleError)
);
}

public updateProjectReward( rewards: Rewards,id):Observable<any> {
  console.log(rewards)
  return this.http.put(`${this.apiUrl}/api/updateProjectRewardsById/${id}`,rewards, {
    headers: { Authorization: `Bearer ${this.getAuthorizationToken()}`}
  }).pipe(map(this.extractData),
  catchError(this.handleError)
);
}


public deleteProjectRewardsById( idReward):Observable<any> {
  return this.http.delete(`${this.apiUrl}/api/deleteProjectRewardsById/${idReward}`, {
    headers: { Authorization: `Bearer ${this.getAuthorizationToken()}`}
  }).pipe(map(this.extractData),
  catchError(this.handleError)
);
}


public getBankInfoByProjectId(idProject): Observable<any> {
  return this.http.get(`${this.apiUrl}/api/getBankInfoByProjectId/${idProject}`,{
    headers: {'Content-Type':'application/json'}
  }).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

public saveProjetBankInfo( bank: BankStatus):Observable<any> {
  console.log(bank)
  return this.http.post(`${this.apiUrl}/api/saveProjetBankInfo`,bank, {
    headers: { Authorization: `Bearer ${this.getAuthorizationToken()}`}
  }).pipe(map(this.extractData),
  catchError(this.handleError)
);
}

public updateBankInfoByProjectId( bank: BankStatus ,id):Observable<any> {
  console.log(bank)
  return this.http.put(`${this.apiUrl}/api/updateBankInfoByProjectId/${id}`,bank, {
    headers: { Authorization: `Bearer ${this.getAuthorizationToken()}`}
  }).pipe(map(this.extractData),
  catchError(this.handleError)
);
}

public getContributorById(id): Observable<any> {
  return this.http.get(`${this.apiUrl}/api/getContributorById/${id}`,{
    headers: {'Content-Type':'application/json'}
  }).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

public getContributorByProjectId(idProject): Observable<any> {
  return this.http.get(`${this.apiUrl}/api/getContributorByProjectId/${idProject}`,{
    headers: {'Content-Type':'application/json'}
  }).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

public getUserContributons(idUser): Observable<any> {
  return this.http.get(`${this.apiUrl}/api/getUserContributons/${idUser}`,{
    headers: { Authorization: `Bearer ${this.getAuthorizationToken()}`}
  }).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

public saveContributor( contributors: Contributors):Observable<any> {
  console.log(contributors)
  return this.http.post(`${this.apiUrl}/api/saveContributor`,contributors, {
    headers: { Authorization: `Bearer ${this.getAuthorizationToken()}`}
  }).pipe(map(this.extractData),
  catchError(this.handleError)
);
}



  public getAuthorizationToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.access_token;
  }


  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }
  



}
