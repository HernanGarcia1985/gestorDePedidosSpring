package com.crisalis.orderManagerSpring.dto;

import lombok.*;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {

    //@Email
    @NotBlank
    private String email;

    @NotBlank
    private String username;

    @Size(min=8)
    private String password;

    //private Integer id_roles;
}
