package com.crisalis.orderManagerSpring.model;



import lombok.*;


import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@Entity
@Table(name = "users", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
@AllArgsConstructor
@NoArgsConstructor

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "email", nullable = false)
    @Email
    @NotBlank
    private String email;

    @Column(name = "userName", nullable = false)
    @NotBlank
    private String userName;

    @Column(name = "password", nullable = false)
    @Size(min=8)
    private String password;

    // Agregar relacion
    @ManyToOne
    @JoinColumn(name = "id_roles", nullable = false)
    // @Column(name = "id_roles")
    private Role role;


    /*public User() {
    }

    public User(int id, String email, String userName, String password) {
        super();
        this.id = id;
        this.email = email;
        this.userName = userName;
        this.password = password;
        this.role = new Role();
    }*/

}
