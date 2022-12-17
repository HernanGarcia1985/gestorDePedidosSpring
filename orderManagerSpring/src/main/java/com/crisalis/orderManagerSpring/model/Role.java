package com.crisalis.orderManagerSpring.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "roles", uniqueConstraints = @UniqueConstraint(columnNames = "name"))

public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "name")
    private EnumRole name;

    //@OneToMany(mappedBy="role", cascade = CascadeType.ALL)  // id_roles??? , orphanRemoval = false???
    //private List<User> users = new ArrayList<User>();

}
