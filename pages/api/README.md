# Certificates API

This is an API that allows access to certificates using various query parameters. The API supports specific searches based on algorithms, exponents, curves, and free-text search. The available certificate types include `dsc` and `csca`.

## Endpoints

### `GET /api/certificates`

This endpoint allows you to query certificates using multiple search parameters. Depending on the value of the `type` parameter, the API queries a specific table (`dsc_masterlist` or `csca_masterlist`).

### Query Parameters

- **`type`** (`string`, required): Specifies the type of certificates to query. Possible values are:
  - `dsc`: Queries the `dsc_masterlist` table.
  - `csca`: Queries the `csca_masterlist` table.
  
- **`sha`** (`string`, optional): Performs a case-insensitive search based on the certificate's hash algorithm.
  
- **`algorithm`** (`string`, optional): Filters certificates by the signature algorithm.
  
- **`exponent`** (`string`, optional): Filters certificates that match a specific public key exponent.
  
- **`curve`** (`string`, optional): Filters certificates by the cryptographic curve used.
  
- **`search`** (`string`, optional): Performs a free-text search across multiple certificate fields (issuer, hash algorithm, signature algorithm, etc.). It also supports searching countries by name or country code.
  
- **`limit`** (`number`, optional): Specifies the maximum number of certificates returned by the query.

### Responses

- **200 OK**: Returns a JSON object with a list of certificates matching the search criteria.
- **400 Bad Request**: Returned if the `type` parameter is invalid.
- **405 Method Not Allowed**: Occurs if the HTTP method is not `GET`.
- **500 Internal Server Error**: Generated when there is a database query error.

### Usage Examples

#### Search for DSC certificates by type=dsc + sha=256 + algotithm=rsa + search=france
```bash
curl -X GET "https://openpassport.app/api/certificates?type=dsc&sha=sha256&algorithm=rsa&search=france"
